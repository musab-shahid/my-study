"""Deterministic SQLite check for the Subject 5.5 SQL worked example.

All station names and temperatures are synthetic teaching data; no live data is used.
Run: python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_5_5_sql_practice_check.py
"""
from __future__ import annotations

import sqlite3


QUERY = """
SELECT s.id, s.name, AVG(d.tmax) AS mean_june_tmax, COUNT(d.tmax) AS n_valid
FROM stations AS s
JOIN daily AS d ON d.station_id = s.id
WHERE d.date >= '2024-06-01'
  AND d.date <  '2024-07-01'
GROUP BY s.id, s.name
ORDER BY s.id;
"""

LEFT_JOIN_QUERY = """
SELECT s.id, s.name, AVG(d.tmax) AS mean_june_tmax, COUNT(d.tmax) AS n_valid
FROM stations AS s
LEFT JOIN daily AS d
  ON d.station_id = s.id
 AND d.date >= '2024-06-01'
 AND d.date <  '2024-07-01'
GROUP BY s.id, s.name
ORDER BY s.id;
"""


def main() -> None:
    con = sqlite3.connect(":memory:")
    con.execute("PRAGMA foreign_keys = ON")
    con.executescript(
        """
        CREATE TABLE stations (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
        CREATE TABLE daily (
            station_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            tmax REAL,
            FOREIGN KEY (station_id) REFERENCES stations(id)
        );
        INSERT INTO stations VALUES (1, 'Station A'), (2, 'Station B'), (3, 'Station C');
        INSERT INTO daily VALUES
          (1, '2024-06-01', 40.0),
          (1, '2024-06-02', 42.0),
          (1, '2024-06-03', 44.0),
          (1, '2024-07-01', 99.0),
          (2, '2024-06-01', 34.0),
          (2, '2024-06-02', 36.0);
        """
    )

    rows = con.execute(QUERY).fetchall()
    expected = [(1, "Station A", 42.0, 3), (2, "Station B", 35.0, 2)]
    assert rows == expected, f"unexpected June aggregation: {rows!r}"

    # The INNER JOIN excludes Station C because it has no observations.
    assert all(row[0] != 3 for row in rows), "INNER JOIN should omit no-observation station"

    # The LEFT JOIN retains Station C. Put date predicates in ON, not WHERE,
    # otherwise the unmatched row would be filtered out and behave like an INNER JOIN.
    left_rows = con.execute(LEFT_JOIN_QUERY).fetchall()
    expected_left = [
        (1, "Station A", 42.0, 3),
        (2, "Station B", 35.0, 2),
        (3, "Station C", None, 0),
    ]
    assert left_rows == expected_left, f"unexpected LEFT JOIN result: {left_rows!r}"

    june_count = con.execute(
        """
        SELECT COUNT(*) FROM daily
        WHERE date >= '2024-06-01' AND date < '2024-07-01'
        """
    ).fetchone()[0]
    assert june_count == 5, f"expected 5 June observations, got {june_count}"

    orphan_keys = con.execute(
        """
        SELECT d.station_id, COUNT(*) AS n
        FROM daily AS d
        LEFT JOIN stations AS s ON s.id = d.station_id
        WHERE s.id IS NULL
        GROUP BY d.station_id
        """
    ).fetchall()
    assert orphan_keys == [], f"unexpected orphan station keys: {orphan_keys!r}"

    # Simulate a legacy/imported table with an orphan key despite the declared FK.
    # SQLite only enforces foreign keys when enabled, so disable enforcement for this
    # deliberate corruption fixture; the diagnostic itself must still detect it.
    con.execute("PRAGMA foreign_keys = OFF")
    con.execute("INSERT INTO daily VALUES (999, '2024-06-04', 50.0)")
    orphan_keys = con.execute(
        """
        SELECT d.station_id, COUNT(*) AS n
        FROM daily AS d
        LEFT JOIN stations AS s ON s.id = d.station_id
        WHERE s.id IS NULL
        GROUP BY d.station_id
        """
    ).fetchall()
    assert orphan_keys == [(999, 1)], f"orphan diagnostic failed: {orphan_keys!r}"

    con.close()
    print("Subject 5.5 SQL check passed (synthetic aggregation, date bounds, counts, orphan-key diagnostic).")


if __name__ == "__main__":
    main()
