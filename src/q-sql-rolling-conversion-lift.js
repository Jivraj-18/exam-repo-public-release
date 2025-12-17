export default async function ({ user, weight = 1 }) {
  return {
    id: "sql_rolling_conversion_lift",
    weight,

    question: `
### SQL Analysis — Rolling Conversion Lift Detection

You are part of the growth analytics team at a SaaS company monitoring
daily product activations. Sudden improvements in conversion rate
often indicate successful experiments or campaigns.

You are given a table \`daily_metrics\` with the following columns:

- \`metric_date\` (DATE)
- \`region\` (TEXT)
- \`sessions\` (INTEGER)
- \`conversions\` (INTEGER)

Your task is to identify **unusual positive conversion spikes**.

#### Task

Using SQL window functions:

1. Compute the **daily conversion rate**:
   \`conversion_rate = conversions / sessions\`

2. For each region, compute the **7-day trailing average conversion rate**
   (exclude the current day).

3. Compute the **lift** for each day as:

\`\`\`
(conversion_rate - trailing_avg) / trailing_avg
\`\`\`

4. Filter to:
   - \`region = 'APAC'\`
   - positive lift values only

5. Identify the **maximum conversion lift** observed.

📌 **Question**  
What is the **maximum positive conversion lift** for the APAC region?

(Enter the value as a decimal or percentage, rounded to two decimals.)
    `,

    type: "number",

    answer: 0.27,
  };
}
