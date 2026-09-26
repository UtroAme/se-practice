# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a
finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there
is nothing.

| Use case | Stories (US-nn) | Criteria (AC-nn) | Gap? |
| --- | --- | --- | --- |
| UC-01 View availability | US-01 | AC-01, AC-02, AC-03 | no |
| UC-02 Book room | US-02 | AC-04, AC-05, AC-06, AC-07 | no |
| UC-03 Cancel booking | US-03 | none | yes |
| UC-04 Block or unblock room | US-04, US-05 | AC-08, AC-09 | no |
| UC-05 Review usage | US-06 | none | yes |
| UC-06 Send confirmation | US-07 | none | yes |

**Stories that belong to no use case:** none

**What the gaps tell you:** The gaps show that while all core functions are covered by our user stories, we intentionally haven't detailed acceptance criteria for UC-03, UC-05, and UC-06 yet, leaving them as areas that need test specifications in the next iteration.