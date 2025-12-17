export default async function ({ user, weight = 1 }) {
  return {
    id: "excel-pivot-logic",
    weight,
    title: "Excel Pivot Table Aggregation",
    question: `
You want to calculate total sales per region from a dataset.
Which Excel feature should you use?
    `,
    options: [
      "Conditional Formatting",
      "Pivot Table",
      "Data Validation",
      "Text to Columns",
    ],
    answer: 1,
  };
}
