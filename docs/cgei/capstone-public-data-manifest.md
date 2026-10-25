# Capstone public-data pathway — source note

| Field | Value |
|-------|--------|
| Product | MODIS/Terra Land Surface Temperature/Emissivity 8-Day L3 Global 1 km (**MOD11A2**) |
| Version | 061 |
| Documentation | https://lpdaac.usgs.gov/products/mod11a2v061/ |
| Provider | NASA LP DAAC |
| Variable (teaching) | LST_Day_1km |
| Units | Kelvin |
| Resolution | ~1 km; 8-day composite |
| Licence | NASA EOSDIS data generally available for research/education — **verify current NASA/LP DAAC policy** before redistribution |
| Offline CI file | `fixtures/data/capstone_lst_extract_sample.csv` |
| Disclaimer | Teaching extract only; **not** verified Multan observations |

## Distinctions enforced in tests

1. LST is not air temperature.  
2. Extract-mean anomaly is not a multi-year climatology.  
3. Exposure/vulnerability layers in the teaching merge are synthetic proxies.  
4. Composite ranks are relative prioritisation aids under stated weights, not validated losses.
