export const questions = [
  {
    id: 1,
    question: `
You are processing a large JSONL log file using jq.

Some records do not contain the field "status", causing jq filters to fail.

Explain why this happens and how jq can be used safely to handle missing fields without crashing the pipeline.
`,
    expected_answer: `
jq filters fail when they assume a field always exists.
If a field is missing, jq produces null values.
Using safe patterns like select(has("status")) or the // operator for fallback values prevents failures and allows the pipeline to continue safely.
`
  },

  {
    id: 2,
    question: `
A DuckDB query aggregates data using GROUP BY, but the result contains duplicated rows.

Explain one common mistake that causes this behavior and how it should be fixed.
`,
    expected_answer: `
This usually happens when non-aggregated columns are selected without being included in the GROUP BY clause.
DuckDB requires all selected non-aggregated columns to be grouped.
Fixing the GROUP BY clause or removing extra columns resolves the duplication issue.
`
  },

  {
    id: 3,
    question: `
A shell command uses grep to filter log files, but it matches more lines than expected.

Explain why this happens and how grep options can be adjusted to make the match more precise.
`,
    expected_answer: `
This happens due to partial or unanchored pattern matching.
Using options like -w for whole-word matching, ^ and $ for anchors, or more specific regular expressions helps ensure precise matches.
`
  },

  {
    id: 4,
    question: `
In Excel, a pivot table shows incorrect totals after new rows are added to the source data.

Explain why this occurs and how to ensure the pivot table always includes new data.
`,
    expected_answer: `
Pivot tables do not automatically refresh or expand their source range.
Converting the data range into an Excel Table or refreshing the pivot table ensures that new rows are included correctly.
`
  },

  {
    id: 5,
    question: `
While measuring area in QGIS, the calculated values appear incorrect or unrealistic.

Explain one common reason for this issue and how it should be corrected.
`,
    expected_answer: `
This usually occurs when measurements are performed using a geographic coordinate reference system.
Switching to an appropriate projected CRS, such as UTM, allows QGIS to calculate accurate area measurements.
`
  }
];
