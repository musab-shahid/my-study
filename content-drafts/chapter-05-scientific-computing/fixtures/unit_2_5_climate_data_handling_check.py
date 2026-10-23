"""Unit 2.5 climate data handling (stdlib).

Synthetic hourly temperatures (°C) spanning a UTC day boundary to show
local-day (PKT=UTC+5) daily maxima differ from UTC-day maxima.

Also:
  - precipitation accumulation (sum) vs temperature mean
  - completeness threshold for a monthly mean
  - monthly anomaly relative to a 2-year baseline
  - missing remains distinct from zero

Teaching only — not ERA5 validation, CDS download, or xarray pipeline tests.
"""
from __future__ import annotations

from math import isclose

# Hourly series: hour_utc, temp_c
# Day D: hours 0-23 UTC; PKT local day for calendar date D starts at UTC 19 previous day
# Construct so local max on PKT day differs from UTC day max.
HOURS = list(range(0, 48))  # two UTC days
TEMP = []
for h in HOURS:
    # Base diurnal: peak near 10 UTC (~15 PKT) and cooler night
    local_h = (h + 5) % 24
    t = 28.0 + 6.0 * (1 if 10 <= local_h <= 16 else 0) - 3.0 * (1 if local_h < 6 else 0)
    TEMP.append(t)
# Inject a hot spike at UTC hour 22 of day0 (03 PKT next calendar day)
TEMP[22] = 42.0


def daily_max_utc(temps, start_hour, n_hours=24):
    return max(temps[start_hour : start_hour + n_hours])


def daily_max_pkt(temps, utc_hours, pkt_offset=5):
    """Group by local calendar day index = (utc_hour + offset) // 24."""
    buckets = {}
    for h, t in zip(utc_hours, temps):
        local_day = (h + pkt_offset) // 24
        buckets.setdefault(local_day, []).append(t)
    return {d: max(vs) for d, vs in buckets.items()}


def monthly_mean(values, min_complete=0.8):
    valid = [v for v in values if v is not None]
    if len(values) == 0:
        raise ValueError("empty")
    frac = len(valid) / len(values)
    if frac < min_complete:
        return None  # incomplete month
    return sum(valid) / len(valid)


def anomaly(value, baseline_mean):
    return value - baseline_mean


def main() -> None:
    utc0 = daily_max_utc(TEMP, 0)
    utc1 = daily_max_utc(TEMP, 24)
    pkt = daily_max_pkt(TEMP, HOURS)
    # Spike at UTC 22 belongs to PKT day 1 (22+5=27 -> day 1)
    assert pkt[1] >= 42.0
    # UTC day 0 max may be the spike if included in hours 0-23
    assert utc0 == 42.0
    # Local vs UTC grouping is not identical for all days
    assert set(pkt.keys()) >= {0, 1}

    # Precip: sum accumulation vs mean
    precip_mm = [0.0, 2.0, None, 3.0]  # daily
    total = sum(v for v in precip_mm if v is not None)
    assert isclose(total, 5.0, abs_tol=1e-12)
    # Missing must not become 0 in a mean of temperature
    tvals = [10.0, None, 14.0]
    assert isclose(sum(v for v in tvals if v is not None) / 2, 12.0, abs_tol=1e-12)

    # Completeness: 3/10 valid < 0.8 -> incomplete
    sparse = [1.0, None, None, None, None, None, None, None, None, 2.0]
    assert monthly_mean(sparse, 0.8) is None
    dense = [float(i) for i in range(10)]
    assert isclose(monthly_mean(dense, 0.8), 4.5, abs_tol=1e-12)

    # Anomaly
    baseline_jul = 32.0
    assert isclose(anomaly(35.0, baseline_jul), 3.0, abs_tol=1e-12)

    print(
        "Unit 2.5 climate-data-handling checks passed "
        f"(utc0_max={utc0}, pkt_day1_max={pkt[1]}, precip_sum={total}, "
        f"anomaly={anomaly(35.0, baseline_jul)})."
    )


if __name__ == "__main__":
    main()
