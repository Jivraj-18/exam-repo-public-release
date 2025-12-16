export const questions = [
  {
    id: 1,
    question: `
You are processing a large JSONL log file using jq.

Some records do not contain the field "status".

Explain why filters like select(.status == "error") may behave unexpectedly
and show one safe jq pattern to handle missing fields.
`,
    expected_answer: `
jq returns null when a field is missing.
Using select(has("status")) or providing a fallback with (.status // "")
prevents incorrect filtering and keeps pipelines safe.
`
  },

  {
    id: 2,
    question: `
A CSV file contains malformed rows that cause standard parsers to fail.

How can DuckDB read such files safely, and which option enables this?
`,
    expected_answer: `
DuckDB can use read_csv_auto with ignore_errors=true
to skip malformed rows while still loading valid data.
`
  },

  {
    id: 3,
    question: `
What is faceting in Datasette, and why is it useful during exploratory analysis?
`,
    expected_answer: `
Faceting shows value distributions and enables interactive filtering.
It helps identify patterns and high-impact categories without writing SQL.
`
  },

  {
    id: 4,
    question: `
While processing a very large JSON file in Python, loading the entire file
causes memory issues.

Which library enables streaming JSON parsing and why is it useful?
`,
    expected_answer: `
The ijson library parses JSON incrementally.
It avoids loading the full file into memory, making it suitable for large datasets.
`
  },

  {
    id: 5,
    question: `
You need rolling averages over time-series data in DuckDB.

Which SQL feature enables this and why is it preferred?
`,
    expected_answer: `
Window functions using OVER() enable rolling calculations efficiently
without complex self-joins or manual aggregation.
`
  }
];
