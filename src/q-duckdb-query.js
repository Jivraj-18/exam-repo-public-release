export default async function question({ user, weight = 1 }) {
  const id = "q-duckdb-query";

  return {
    id,
    title: "DuckDB Window Function",
    weight,
    description: `
      <p><strong>Write a DuckDB query with window functions:</strong></p>
      <p>Given a table <code>sales(date DATE, amount DECIMAL)</code> with daily sales data:</p>
      <pre>date       | amount
2025-01-01 | 1000
2025-01-02 | 1200
2025-01-03 | 1100
...</pre>
      <p>Write a SQL query that:</p>
      <ol>
        <li>Calculates a 7-day rolling average of the amount</li>
        <li>Uses a window function with <code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code></li>
        <li>Order by date ascending</li>
        <li>Return: date, amount, and rolling_avg columns</li>
      </ol>
    `,
    inputType: "textarea",
    placeholder: `SELECT date, amount,\n  AVG(amount) OVER (\n    ORDER BY date\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ) as rolling_avg\nFROM sales\nORDER BY date;`,
    answer: async (code) => {
      if (!code || code.trim().length < 50) return false;
      const required = ["AVG", "OVER", "ROWS BETWEEN", "PRECEDING", "CURRENT ROW"];
      return required.every((word) => code.toUpperCase().includes(word));
    },
  };
}