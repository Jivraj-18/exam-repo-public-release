export default function ({ weight = 0.75 }) {
  return {
    id: "api_pagination_active",
    title: "Paginated API Count",
    description: `
Fetch page=3 from the API endpoint.
Count items where status is "active".
`,
    answer:  // integer
    weight,
  };
}