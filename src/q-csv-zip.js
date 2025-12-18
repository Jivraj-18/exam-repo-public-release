export default async function ({ user, weight = 1 }) {
  return {
    id: "q-csv-zip-variant",
    title: "Extract and Analyze Sales Data from ZIP",
    weight,

    prompt: `
A ZIP archive contains sales_q2_2025.csv with columns:
date, city, product, quantity, price

Task:
• Extract the CSV from the ZIP
• Filter rows where:
  city = "Hyderabad"
  month = March 2025
• Compute total revenue:
  SUM(quantity × price)
• Round to nearest integer

Submit the final revenue value.
    `,

    inputSpec: "sales_q2_2025.zip",
    outputSpec: "Rounded integer revenue",

    help: [
      "Parse dates correctly",
      "Apply city and month filters",
      "Multiply quantity by price before summing"
    ]
  };
}
