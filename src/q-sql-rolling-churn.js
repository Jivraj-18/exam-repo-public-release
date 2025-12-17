export default function ({ user, weight = 1.25 }) {
  return {
    id: "sql_rolling_churn_spike",
    weight,

    prompt: `
**SQL: Detect Rolling Churn Spike**

A product tracks daily churned users per region.

**Task**
1. Compute a **7-day trailing average churn** (excluding current day).
2. Calculate churn lift as:
   \`(churn_today - trailing_avg) / trailing_avg\`
3. Filter to region = 'APAC'.
4. Return the **maximum positive churn lift** observed.

**Output**
Return a decimal or percentage.
    `,

    answer: 0.41,

    tolerance: 0.02,
  };
}
