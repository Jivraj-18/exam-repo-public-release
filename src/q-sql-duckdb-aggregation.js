export default {
  id: "sql-duckdb-aggregation",
  title: "SQL Aggregation using DuckDB",
  description: "Aggregate tabular data using SQL queries in DuckDB.",
  question: `
A DuckDB table "orders" has the following columns:

- order_id
- customer_id
- amount

Write an SQL query to compute the total order amount per customer,
sorted by total amount in descending order.
`,
  answer: `
SELECT
  customer_id,
  SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id
ORDER BY total_amount DESC;
`
};
