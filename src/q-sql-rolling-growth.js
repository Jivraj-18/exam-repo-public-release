export default async function ({ user, weight = 1 }) {
  const answer = 0.40;

  return {
    id: "sql_rolling_growth",
    weight,
    question: `
NovaApp records daily signups by region.

**Task**
1. Compute a **5-day trailing average** of signups (excluding current day).
2. Calculate lift as:

\`\`\`
(signups - trailing_avg) / trailing_avg
\`\`\`

3. Filter to **region = 'APAC'**
4. Find the **maximum positive lift**

Use SQL window functions.

Return the lift as a **decimal rounded to 2 places**.

*(Dataset provided in the SQL environment.)*
    `,
    answer,
    validate: (input) =>
      Math.abs(parseFloat(input) - answer) < 0.02,
  };
}
