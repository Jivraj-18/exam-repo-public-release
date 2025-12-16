export default function ({ user, weight = 2 }) {
  return {
    id: "duckdb-marketing-saturation",
    title: "DuckDB: Marketing Spend Saturation Point",
    weight,

    description: `
OptiScale is a B2B SaaS company running weekly digital marketing campaigns.
While higher spend generally increases revenue, leadership suspects diminishing
returns beyond a certain spend threshold.

You are given a CSV file with the following columns:

week_start_date
channel
marketing_spend_usd
revenue_usd

Each row represents one channel’s weekly performance.

Your task is to use DuckDB to identify the **spend saturation inflection point**.

Instructions:

1. Load the CSV directly into DuckDB using READ_CSV_AUTO.
2. Bucket marketing_spend_usd into $5,000 bins
   (e.g. 0–4999, 5000–9999, …).
3. For each spend bucket, compute:

   avg_revenue_per_dollar = SUM(revenue_usd) / SUM(marketing_spend_usd)

4. Order the buckets by increasing spend.
5. Compute the percentage drop in avg_revenue_per_dollar compared
   to the previous bucket.
6. Identify the **first bucket** where the drop is **40% or more**.
7. Return only the **lower bound of that spend bucket**.

What is the marketing spend (USD) at which revenue efficiency first drops
by at least 40%?

Enter only the numeric value (no symbols).
    `,

    type: "input",
    placeholder: "e.g. 25000",
  };
}

