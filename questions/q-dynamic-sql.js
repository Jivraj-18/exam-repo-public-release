export default function ({ user, elementMap }) {
  return {
    id: "dynamic-sql-filters",

    title: "Dynamic SQL Queries with Optional Filters",

    difficulty: "moderate",

    tags: ["sql", "dynamic-queries", "security"],

    prompt: `
Write a SQL query that supports optional filters such as date range and status.

Implement the query in Python using parameterized SQL and explain why it is secure.
    `,

    validate: ({ code }) => {
      return code && (code.includes("?") || code.includes("%s"));
    }
  };
}
