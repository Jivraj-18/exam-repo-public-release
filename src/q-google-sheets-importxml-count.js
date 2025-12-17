export default async function ({ user, weight = 1 }) {
  return {
    id: "google_sheets_importxml_count",
    weight,

    help: [
      `
Data Sourcing — Counting Structured Web Data with Google Sheets

EduMetrics is an education analytics startup that tracks publicly available
demographic indicators to support policy research.

One of their analysts uses Google Sheets to quickly prototype data extraction
pipelines from reliable public websites.

Wikipedia page:
https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India

This page contains a structured HTML table listing all Indian states
and union territories along with related metadata.

Task:
1. Use IMPORTXML to extract the names of states and union territories
2. Ensure the formula dynamically pulls data from the webpage
3. Count the total number of entries (excluding header)
      `,
    ],

    question: `
What is the total number of states and union territories listed in the table?
    `,

    type: "number",
    answer: 36,
  };
}
