export default function openrefineJsonExportQuestion({ user, weight }) {
  return {
    id: "q-openrefine-json-export",
    title: "OpenRefine Cleaning and JSON Export",
    weight,
    prompt: `
Clean customer data using OpenRefine:
- Cluster customer_name and merge variants
- Remove duplicates by customer_id
- Normalize amount_usd to numeric
- Export cleaned dataset as JSON
- Submit SHA256 hash of the cleaned file
    `,
  };
}