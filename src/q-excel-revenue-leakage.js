export default function ({ user, weight }) {
  return {
    id: "excel-revenue-leakage",
    weight,
    title: "Excel: Revenue leakage audit",
    description: `
A subscription company merged regional billing exports into one Excel sheet.

Columns:
- Customer ID (extra spaces)
- Region (EU, Europe, Eur.)
- Billing Date (mixed formats incl. YYYY-MM and Q1 2024)
- Billed Amount (USD strings, commas)
- Collected Amount (may be blank)

Tasks:
1. Trim IDs and normalize Region to "Europe".
2. Convert quarter strings to the quarter end date.
3. Convert amounts to numbers.
4. If Collected Amount is blank, assume 92% of Billed Amount.
5. Filter Europe records billed on or before 2024-06-30.
6. Compute total revenue leakage = Billed − Collected.

Enter the final leakage amount in USD.
    `,
    answer: {
      type: "number",
      tolerance: 0.01,
    },
  };
}
