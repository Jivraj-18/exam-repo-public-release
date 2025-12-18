export default function ({ user, weight = 1 }) {
  return {
    id: "excel_region_cleanup",
    weight,
    question: `
You are given an Excel sheet with columns:
Region, Revenue, Expense.

Issues:
- Region values include "EU", "Europe ", "E.U.".
- Revenue contains values like "$12,400", "USD 8500", or blanks.
- Expense is missing in some rows.

Tasks:
1. Standardise all Europe variants to "Europe".
2. Convert Revenue to numbers.
3. If Expense is blank, fill it as 40% of Revenue.
4. Compute total profit (Revenue − Expense) for Europe.

What Excel feature helps remove extra spaces from Region names?
`,
    answer: "TRIM",
  };
}
