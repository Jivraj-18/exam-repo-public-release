export default function ({ user, weight = 0.5 }) {
  return {
    id: "csv_region_sales",
    title: "CSV Region Sales",
    description: `
Download the CSV from the given URL.
Filter rows where region = "South".
Sum the sales column.
`,
    answer:  // numeric value
    weight,
  };
}