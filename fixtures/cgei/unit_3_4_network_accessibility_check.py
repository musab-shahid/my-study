"""Unit 3.4.2 instructional network routing and accessibility (stdlib).

Synthetic undirected graph (not OSM / real roads).

Nodes: A (origin), B, C, Clinic, Shelter, Island (disconnected)

Edges (length_km, time_min):
  A-B: 2 km, 10 min   (short but slow)
  A-C: 5 km,  6 min   (longer but faster)
  B-Clinic: 2 km, 4 min
  C-Clinic: 1 km, 3 min
  B-Shelter: 4 km, 5 min
  C-Shelter: 2 km, 8 min

Distance-shortest A→Clinic: A-B-Clinic = 4 km
Time-shortest A→Clinic: A-C-Clinic = 9 min  (A-B-Clinic is 14 min)

Accessibility: origins with time cost to Clinic ≤ 10 min.
Teaching only — not production routing, turn restrictions, or traffic.
"""
from __future__ import annotations

import heapq
from math import isclose

# adjacency: node -> list of (neighbor, length_km, time_min)
GRAPH = {
    "A": [("B", 2.0, 10.0), ("C", 5.0, 6.0)],
    "B": [("A", 2.0, 10.0), ("Clinic", 2.0, 4.0), ("Shelter", 4.0, 5.0)],
    "C": [("A", 5.0, 6.0), ("Clinic", 1.0, 3.0), ("Shelter", 2.0, 8.0)],
    "Clinic": [("B", 2.0, 4.0), ("C", 1.0, 3.0)],
    "Shelter": [("B", 4.0, 5.0), ("C", 2.0, 8.0)],
    "Island": [],  # disconnected
}


def dijkstra(graph, source, weight_index):
    """weight_index: 0=length_km, 1=time_min (after neighbor name). Returns cost, prev."""
    dist = {n: float("inf") for n in graph}
    prev = {n: None for n in graph}
    dist[source] = 0.0
    pq = [(0.0, source)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for nbr, length, time in graph[u]:
            w = length if weight_index == 0 else time
            if w < 0:
                raise ValueError(f"negative weight {w} on {u}->{nbr}")
            nd = d + w
            if nd < dist[nbr]:
                dist[nbr] = nd
                prev[nbr] = u
                heapq.heappush(pq, (nd, nbr))
    return dist, prev


def reconstruct(prev, target):
    if prev[target] is None and target not in prev:
        return None
    path = []
    cur = target
    while cur is not None:
        path.append(cur)
        cur = prev[cur]
    path.reverse()
    return path


def main() -> None:
    # Distance-shortest A → Clinic
    d_len, p_len = dijkstra(GRAPH, "A", 0)
    assert isclose(d_len["Clinic"], 4.0, abs_tol=1e-12)
    path_len = reconstruct(p_len, "Clinic")
    assert path_len == ["A", "B", "Clinic"]

    # Time-shortest A → Clinic (different path)
    d_time, p_time = dijkstra(GRAPH, "A", 1)
    assert isclose(d_time["Clinic"], 9.0, abs_tol=1e-12)
    path_time = reconstruct(p_time, "Clinic")
    assert path_time == ["A", "C", "Clinic"]

    # Unreachable Island
    assert d_len["Island"] == float("inf")
    assert d_time["Island"] == float("inf")

    # Accessibility: time to Clinic ≤ 10 from A, B, C
    origins = ["A", "B", "C"]
    within = []
    for o in origins:
        d, _ = dijkstra(GRAPH, o, 1)
        if d["Clinic"] <= 10.0:
            within.append(o)
    assert within == ["A", "B", "C"]  # A=9, B=4, C=3

    # After synthetic edge removal A-C (road closure scenario)
    graph_closed = {
        k: [e for e in v if not (k == "A" and e[0] == "C") and not (k == "C" and e[0] == "A")]
        for k, v in GRAPH.items()
    }
    d_closed, _ = dijkstra(graph_closed, "A", 1)
    assert isclose(d_closed["Clinic"], 14.0, abs_tol=1e-12)  # forced A-B-Clinic

    # Negative weight rejected
    try:
        dijkstra({"X": [("Y", -1.0, 1.0)], "Y": []}, "X", 0)
        raise AssertionError("expected negative weight error")
    except ValueError:
        pass

    print(
        "Unit 3.4 network accessibility checks passed "
        f"(dist_path={path_len}, time_path={path_time}, "
        f"time_cost={d_time['Clinic']}, closed_cost={d_closed['Clinic']})."
    )


if __name__ == "__main__":
    main()
