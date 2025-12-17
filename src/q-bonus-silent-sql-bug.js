export default async function ({ user, weight = 1 }) {
  return {
    id: "silent-sql-bug",
    question: `
You are given two tables: \`orders\` and \`order_items\`.

A SQL query computes Average Order Value (AOV).
The query executes successfully but consistently overestimates the value.

Your task:
1. Run the given query in SQLite or DuckDB.
2. Identify the logical flaw.
3. Fix the query.
4. Re-run it.

Submit the CORRECT Average Order Value, rounded to 2 decimal places.
`,
    type: "number",
    answer: 342.18,
    tolerance: 0.01,
    weight,
  };
}
