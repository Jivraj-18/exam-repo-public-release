export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_html_table_sum",
    weight,
    question: `
DataLens audits tabular reports published online.

Visit:
https://sanand0.github.io/tdsdata/html_table/7.html

Task:
1. Extract the table
2. Sum all numeric values in the LAST column

Enter the total as a number.
    `,
    input: "number",
    answer: 684,
  };
}
