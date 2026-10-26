# Legacy topic disposition (Learn screen)

**Policy:** When a CGEI subject has canonical **Learning units**, the Learn screen shows a single learning path (units). Legacy Section → Topic lists are **not** shown as a competing course.

Legacy topic **IDs remain** in data for deep links, progress keys, and quizzes until an explicit retirement pass.

## Climate Science (`cgei-climate-science`)

| Legacy topic ID | Section | Disposition |
|-----------------|---------|-------------|
| `cgei-climate-data-products` | CGEI-024 | Gap / partial — unit path is primary (Units 2.4+) |
| `cgei-2-4-classes` | CGEI-024 | Map toward Unit 2.4 lessons when content parity verified |
| `cgei-2-4-era5` | CGEI-024 | Map toward Unit 2.4 |
| `cgei-time-units-daily` | CGEI-025 | Map toward Unit 2.5 |
| `cgei-2-5-units` | CGEI-025 | Map toward Unit 2.5 |
| `cgei-2-5-clocks` | CGEI-025 | Map toward Unit 2.5 |
| `cgei-extremes-and-trend-analysis` | CGEI-02 | Map toward Unit 2.6 |
| `cgei-2-6-spi-spei` | CGEI-02 | Map toward Unit 2.6 |
| `cgei-2-6-trends` | CGEI-02 | Map toward Unit 2.6 |

None of these topics are deleted. They are **hidden from the Learn hierarchy** when units exist, not declared content-complete.

## Data Science

Unit 5.1 bridges `legacySectionId: CGEI-051`. Other Subject 5 content is primarily canonical lessons.

## Compatibility

- `isCgeiOverviewTopic` still excludes roadmap IDs from topic counts.
- Direct `/topic/:id` routes for non-overview legacy topics still work.
- Overview roadmap IDs still redirect to Learn + orientation.
