# Climate Science legacy-question lesson mapping — approval required

**Status: proposal only. No `lessonId` values are changed by this review table.**

This table covers the 37 legacy Climate Science questions that currently have no canonical lesson link. The proposed targets were selected from the actual Subject 2 lesson titles and question content, not by blindly copying the old quiz-topic grouping.

The existing `topicId` values remain unchanged for quiz-engine section/topic compatibility and saved-progress aliases. After approval, a separate migration will add the proposed `lessonId` values and tests. Please review the proposed lesson for each ID; any correction can be made before application.

## Proposed mapping

| Question ID | Existing quiz topic | Question focus | Proposed Subject 2 lesson | Mapping rationale |
|---|---|---|---|---|
| CGEI-02-Q001 | extremes-and-trend-analysis | SPI vs SPEI | **2.6.1 — Thresholds, heat and rainfall extremes** | Drought/extreme indicator interpretation |
| CGEI-02-Q002 | extremes-and-trend-analysis | Serial correlation and Mann–Kendall | **2.6.2 — Trend estimation** | Dependence affects trend-test inference |
| CGEI-02-Q003 | extremes-and-trend-analysis | Multiple testing across grid cells | **2.6.3 — Return periods and inference discipline** | Field significance and inferential caution |
| CGEI-02-Q004 | extremes-and-trend-analysis | Heatwave threshold sensitivity | **2.6.1 — Thresholds, heat and rainfall extremes** | Extreme-event definition |
| CGEI-02-Q005 | extremes-and-trend-analysis | UTC versus local daily maxima | **2.5.1 — Formats, metadata and time conventions** | Local calendar and time-zone handling |
| CGEI-02-Q006 | extremes-and-trend-analysis | Rx1day versus one-hour rainfall | **2.6.1 — Thresholds, heat and rainfall extremes** | Extreme index temporal support |
| CGEI-02-Q007 | extremes-and-trend-analysis | Reanalysis trend reflects product and climate | **2.4.3 — Choosing products and representativeness** | Product limitations and scope of inference |
| CGEI-02-Q008 | extremes-and-trend-analysis | Claims unsupported by a 10-year ERA5 area average | **2.4.3 — Choosing products and representativeness** | Spatial support and product representativeness |
| CGEI-02-Q009 | extremes-and-trend-analysis | Common climate-data workflow failures | **2.5.3 — Reproducible workflow and Multan case template** | Reproducibility and processing discipline |
| CGEI-02-Q010 | extremes-and-trend-analysis | Consecutive dry days (CDD) | **2.6.1 — Thresholds, heat and rainfall extremes** | ETCCDI extreme index |
| CGEI-02-Q011 | extremes-and-trend-analysis | Sen's slope definition | **2.6.2 — Trend estimation** | Robust trend estimator |
| CGEI-02-Q012 | extremes-and-trend-analysis | Pakistan Standard Time offset | **2.5.1 — Formats, metadata and time conventions** | Time-zone convention |
| CGEI-02-Q013 | extremes-and-trend-analysis | ETCCDI rainfall-index interpretation | **2.6.1 — Thresholds, heat and rainfall extremes** | Extreme-index definitions |
| CGEI-02-Q014 | extremes-and-trend-analysis | ERA5 precipitation metres-to-millimetres conversion | **2.5.1 — Formats, metadata and time conventions** | Units and stored-variable interpretation |
| CGEI-02-Q015 | extremes-and-trend-analysis | Median of pairwise slopes | **2.6.2 — Trend estimation** | Sen's slope calculation |
| CGEI-024-Q001 | climate-data-products | What reanalysis represents | **2.4.2 — Gridded products and reanalysis** | Reanalysis concept |
| CGEI-024-Q002 | climate-data-products | CHIRPS and IMERG product classes | **2.4.2 — Gridded products and reanalysis** | Distinguishing gridded product classes |
| CGEI-024-Q003 | climate-data-products | ERA5 native resolution | **2.4.2 — Gridded products and reanalysis** | Reanalysis grid characteristics |
| CGEI-024-Q004 | climate-data-products | Calling ERA5 rainfall “observed” | **2.4.3 — Choosing products and representativeness** | Product naming and scope honesty |
| CGEI-024-Q005 | climate-data-products | CMIP6 scenario-run classification | **2.9.2 — Experiments, scenarios, ensembles, and CMIP6 metadata** | Model experiments and scenarios |
| CGEI-024-Q006 | climate-data-products | Minimum data manifest for a figure | **2.5.3 — Reproducible workflow and Multan case template** | Reproducible processing record |
| CGEI-024-Q007 | climate-data-products | Area average versus a point gauge | **2.4.3 — Choosing products and representativeness** | Spatial support and representativeness |
| CGEI-024-Q008 | climate-data-products | Reanalysis trends and observing-system changes | **2.4.3 — Choosing products and representativeness** | Product history and interpretation limits |
| CGEI-024-Q009 | climate-data-products | Matching descriptions to product classes | **2.4.2 — Gridded products and reanalysis** | Product taxonomy |
| CGEI-024-Q010 | climate-data-products | First inspection of NetCDF/GRIB data | **2.5.1 — Formats, metadata and time conventions** | File structure and metadata before arithmetic |
| CGEI-024-Q011 | climate-data-products | Spatial coverage where stations are sparse | **2.4.3 — Choosing products and representativeness** | Coverage-versus-observation trade-off |
| CGEI-024-Q012 | climate-data-products | Cautious interpretation of a 10-year ERA5 increase | **2.4.3 — Choosing products and representativeness** | Product and spatial-support limitations |
| CGEI-025-Q001 | time-units-daily | Precipitation metres-to-millimetres conversion | **2.5.1 — Formats, metadata and time conventions** | Units and variable encoding |
| CGEI-025-Q002 | time-units-daily | PKT equals UTC+5 | **2.5.1 — Formats, metadata and time conventions** | Time-zone convention |
| CGEI-025-Q003 | time-units-daily | Accumulation period before daily aggregation | **2.5.2 — Aggregation, completeness and anomalies** | Temporal aggregation rules |
| CGEI-025-Q004 | time-units-daily | UTC midnight and Multan daily maximum | **2.5.1 — Formats, metadata and time conventions** | Local-day boundary |
| CGEI-025-Q005 | time-units-daily | Requirements for percentile thresholds | **2.6.1 — Thresholds, heat and rainfall extremes** | Extreme threshold definition |
| CGEI-025-Q006 | time-units-daily | Practices that reduce time/unit errors | **2.5.3 — Reproducible workflow and Multan case template** | Workflow safeguards |
| CGEI-025-Q007 | time-units-daily | Metres misread as millimetres | **2.5.1 — Formats, metadata and time conventions** | Unit/encoding error |
| CGEI-025-Q008 | time-units-daily | JJA versus JJAS seasonal totals | **2.8.1 — Seasons and regional drivers** | Pakistan/South Asian seasonal definition |
| CGEI-025-Q009 | time-units-daily | Masks and missing values in area averages | **2.5.2 — Aggregation, completeness and anomalies** | Area aggregation and missing-data handling |
| CGEI-025-Q010 | time-units-daily | Metres-to-millimetres conversion factor | **2.5.1 — Formats, metadata and time conventions** | Units conversion |

## Scope and safeguards

- **37 questions total:** 21 single-choice, 6 true/false, 4 multi-select, 4 fill-blank and 2 matching.
- The legacy quiz `topicId` remains intact. The table proposes only the canonical `lessonId`.
- The 37 questions remain engine-only until approval and application.
- The lesson-page renderer currently supports single-choice and true/false. Multi-select, fill-blank and matching remain quiz-engine-only unless a separate renderer change is approved.
- The canonical `CurriculumQuestion` projection remains single-choice; this table does not silently expand that schema.
- Approval of this table does not scientifically validate the questions or their answer keys. Scientific review remains a separate requirement.

## Decision

**Awaiting owner approval.** Please approve the table as written or identify the rows to change. No Climate lesson links should be applied before that decision.
