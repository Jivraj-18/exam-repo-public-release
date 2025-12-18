export default async function question({ user, weight = 1 }) {
  const id = "q-polars-lazy";

  return {
    id,
    title: "Polars LazyFrame Pipeline",
    weight,
    description: `
      <p><strong>Build a high-performance Polars pipeline using LazyFrame:</strong></p>
      <p>Write Python code that:</p>
      <ol>
        <li>Loads a large CSV file using <code>pl.scan_csv("sales.csv")</code></li>
        <li>Filters rows where date is after <code>2025-01-01</code></li>
        <li>Groups by <code>category</code> column</li>
        <li>Aggregates: sum of <code>sales</code>, count of records</li>
        <li>Collects with streaming enabled: <code>.collect(streaming=True)</code></li>
        <li>Returns the result as a DataFrame</li>
      </ol>
      <p><em>Polars LazyFrame allows query optimization before execution.</em></p>
    `,
    inputType: "textarea",
    placeholder: `import polars as pl\n\nresult = (\n  pl.scan_csv("sales.csv")\n  .filter(pl.col("date") > "2025-01-01")\n  .groupby("category")\n  .agg([pl.col("sales").sum(), pl.len()])\n  .collect(streaming=True)\n)\nprint(result)`,
    answer: async (code) => {
      if (!code || code.trim().length < 50) return false;
      const required = ["scan_csv", "filter", "groupby", "agg", "collect(streaming"];
      return required.every((word) => code.includes(word));
    },
  };
}