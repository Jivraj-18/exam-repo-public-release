export default async function ({ user, weight = 1 }) {
  return {
    id: "api-pagination",
    weight,
    title: "Handling Paginated APIs",
    question: `
An API returns data using ?page=1&limit=20.
How do you fetch all records?
    `,
    options: [
      "Fetch only page 1",
      "Increase limit",
      "Loop until response is empty",
      "Use POST instead of GET",
    ],
    answer: 2,
  };
}
