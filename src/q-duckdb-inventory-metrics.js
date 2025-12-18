export default function ({ weight = 1 }) {
  return {
    id: "duckdb_inventory_metrics",
    weight,
    question: `
You are using DuckDB to analyse inventory movements.

Inbound quantity = positive
Outbound quantity = negative

Which SQL construct helps replace NULL values when calculating totals?
`,
    answer: "COALESCE",
  };
}
