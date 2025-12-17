export default async function ({ user, weight = 1 }) {
  return {
    id: "sql_rolling_conversion_lift",
    weight,

    help: [
      `
SQL Analytics — Rolling Conversion Lift

You are part of the growth analytics team at a SaaS company analyzing
daily conversion performance across regions.

Table: daily_metrics

Columns:
- metric_date (DATE)
- region (TEXT)
- sessions (INTEGER)
- conversions (INTEGER)

Task:

1. Compute the daily conversion rate:
   conversion_rate = conversions / sessions

2. For each region, compute the 7-day trailing average conversion rate
   using the previous 7 days, excluding the current day.

3. Compute the conversion lift:
   (conversion_rate - trailing_avg) / trailing_avg

4. Filter the results to:
   - region = 'APAC'
   - rows with positive lift only

5. Find the maximum conversion lift observed.
      `,
    ],

    question: `
What is the maximum positive conversion lift for the APAC region?
(Round your answer to two decimal places.)
    `,

    type: "number",
    answer: 0.27,
  };
}
