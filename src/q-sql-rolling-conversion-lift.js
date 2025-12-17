export default async function ({ user, weight = 1 }) {
  return {
    id: "sql_rolling_conversion_lift",
    weight,

    question: `
### SQL Analytics — Rolling Conversion Lift

You are part of the growth analytics team at a SaaS company analyzing
daily conversion performance across regions.

You are given a table \`daily_metrics\` with the following schema:

- \`metric_date\` (DATE)
- \`region\` (TEXT)
- \`sessions\` (INTEGER)
- \`conversions\` (INTEGER)

#### Task

Using SQL window functions:

1. Compute the **daily conversion rate** as:
\`\`\`
conversion_rate = conversions / sessions
\`\`\`

2. For each region, compute the **7-day trailing average conversion rate**
   using the previous 7 days **excluding the current day**.

3. Compute the **conversion lift** for each day as:
\`\`\`
(conversion_rate - trailing_avg) / trailing_avg
\`\`\`

4. Filter the results to:
   - \`region = 'APAC'\`
   - only rows with **positive lift**

5. Find the **maximum conversion lift** observed.

📌 **Question**  
What is the **maximum positive conversion lift** for the APAC region?

(Round your answer to **two decimal places**.)
    `,

    type: "number",

    answer: 0.27,
  };
}
