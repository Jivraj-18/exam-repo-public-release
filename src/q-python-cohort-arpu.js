export default function ({ user, weight = 1 }) {
  return {
    id: "python_cohort_arpu",
    weight,

    prompt: `
**Python: Cohort ARPU Analysis**

You are given a subscription activity log with:
- customer_id
- signup_month
- month_offset
- active_flag
- revenue_usd

**Task**
1. Load the CSV using Pandas.
2. Filter to \`month_offset == 2\`.
3. For cohort **2024-02**, compute:
   \`ARPU = total_revenue / active_customers\`
4. Return the ARPU rounded to 2 decimals.

**Output**
Return a single numeric value (e.g. 24.67).
    `,

    answer: 26.41,

    tolerance: 0.05,
  };
}
