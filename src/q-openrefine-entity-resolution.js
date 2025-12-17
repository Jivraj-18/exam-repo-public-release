export default function ({ user, weight = 1.0 }) {
  return {
    id: "openrefine-entity-resolution",
    title: "Entity Resolution and Spend Normalisation using OpenRefine",
    weight,

    description: `
The procurement operations team at Orbit Commerce exported invoice data from
their ERP system into a CSV file. Due to resubmissions and inconsistent data
entry, the dataset contains duplicate invoices and multiple variations of
supplier names.

You are required to clean and analyse this dataset using **OpenRefine**.

Dataset fields:
• invoice_id — may be duplicated
• supplier_name — inconsistent casing, punctuation, abbreviations
• category — spend category
• invoice_date — ISO date string
• status — Approved, Pending, Rejected, On Hold
• amount_usd — currency text with symbols or spacing
• comment — free-form notes

Workflow to follow in OpenRefine:
1. Import the CSV and trim whitespace on all text columns.
2. Cluster \`supplier_name\` using key collision and nearest-neighbour methods,
   merging variants into canonical names.
3. Remove duplicate rows by \`invoice_id\`, keeping the entry with the cleanest notes.
4. Clean \`amount_usd\` by removing currency symbols and converting it to a number
   (e.g., using GREL).
5. Filter rows where:
   • supplier_name = "Zenith Components"
   • category = "Facility"
   • status = "Approved"
6. Compute the total spend in USD for the filtered rows.

Download the invoice dataset and perform the above steps.

Return ONLY the final total Approved spend in USD as a number (no commas, no currency symbol).
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "number",
      description: "Total approved spend in USD after OpenRefine cleaning"
    },

    grading: {
      type: "numeric",
      tolerance: 0.01
    }
  };
}
