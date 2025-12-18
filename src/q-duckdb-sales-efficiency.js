export default function ({ user, weight }) {
  return {
    id: "duckdb-sales-efficiency",
    weight,
    title: "DuckDB: Sales efficiency diagnostics",
    description: `
You have two DuckDB tables:

sales_orders(order_id, rep_id, region, amount, order_date)
sales_targets(rep_id, monthly_target)

Tasks:
- Focus on APAC region
- Date window: 2024-01-01 to 2024-03-31
- Compute:
  - rep_count
  - total_sales
  - target_attainment = total_sales / SUM(monthly_target)

Return exactly one row.

Write DuckDB SQL only.
    `,
    answer: {
      type: "sql",
    },
  };
}
