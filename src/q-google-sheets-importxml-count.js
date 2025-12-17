export default async function ({ user, weight = 1 }) {
  return {
    id: "google_sheets_importxml_count",
    weight,

    question: `
### Data Sourcing — Counting Structured Web Data with Google Sheets

EduMetrics is an education analytics startup that tracks publicly available
demographic indicators to support policy research. One of their analysts
uses **Google Sheets** to quickly prototype data extraction pipelines
from reliable public websites.

The analyst is working with the Wikipedia page:

\`\`\`
https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India
\`\`\`

This page contains a structured HTML table listing all Indian states
and union territories along with related metadata.

#### Task

Using **Google Sheets**:

1. Use the \`IMPORTXML\` function to extract the column containing
   the names of **states and union territories** from the table.
2. Ensure the formula dynamically pulls the data from the webpage.
3. Count the **total number of entries** returned by the formula
   (excluding the header row).

📌 **Question**  
What is the total number of states and union territories listed in the table?

(Enter a single integer.)
    `,

    type: "number",

    answer: 36,
  };
}
