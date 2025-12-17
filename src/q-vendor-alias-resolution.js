export default function ({ user, weight = 1 }) {
  return {
    id: "vendor_alias_resolution",
    title: "OpenRefine: Vendor Alias Resolution with Conditional Aggregation",
    question: `
A finance team exports reimbursement data where vendor names are noisy due to OCR ingestion.

Examples:
- AMAZON WEB SVCS
- Amazon Web Services, Inc.
- AWS - Cloud
- Amazon AWS

### Dataset Fields
- expense_id
- employee_id
- vendor
- department
- submitted_date
- amount_usd
- approval_status

### Task (OpenRefine only)

1. Cluster \`vendor\` using **key collision** and **nearest neighbour**
2. Resolve all AWS-related aliases into **Amazon Web Services**
3. Remove duplicate \`expense_id\`, keeping the row with the **latest submitted_date**
4. Filter:
   - department = Data
   - approval_status = Approved
   - submitted_date <= 2024-06-30
5. Compute total spend for **Amazon Web Services**
6. Compute what **percentage of total Data department spend** this represents

### Deliverable
Enter the percentage rounded to **2 decimal places**.
    `,
    answer: 38.42,
    weight,
  };
}
