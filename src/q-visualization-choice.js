export default async function ({ user, weight = 1 }) {
  return {
    id: "visualization-choice",
    weight,
    title: "Choosing the Right Chart",
    question: `
You want to show category-wise proportions.
Which chart is most suitable?
    `,
    options: [
      "Line Chart",
      "Scatter Plot",
      "Pie Chart",
      "Histogram",
    ],
    answer: 2,
  };
}
