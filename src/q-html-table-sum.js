export default function ({ user, weight = 1 }) {
  return {
    id: "html_table_sum",
    title: "HTML Table Aggregation",
    weight,
    description: `
Visit the page:
https://sanand0.github.io/tdsdata/html_table/12.html

Calculate the **sum of all numeric values** present in the table.

Return only the final sum.
    `,
    inputType: "text",
    expectedAnswerType: "number",
    checker: async (answer) => !isNaN(Number(answer)),
  };
}
