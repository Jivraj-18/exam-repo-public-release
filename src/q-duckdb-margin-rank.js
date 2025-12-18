export default async function ({ user, weight = 1 }) {
  const answer = "Cloud AI";

  return {
    id: "duckdb_margin_rank",
    weight,
    question: `
HelioCorp relaunched its products on **2024-06-01**.

**Task**
1. Use DuckDB to join sales and product cost data.
2. Filter sales **after launch date**.
3. Compute gross margin:

\`\`\`
(revenue - cost) / revenue
\`\`\`

4. Identify the **category with the highest margin**.

Return **only the category name**.
    `,
    answer,
    validate: (input) =>
      input.trim().toLowerCase() === answer.toLowerCase(),
  };
}
