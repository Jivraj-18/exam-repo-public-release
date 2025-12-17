export default function ({ user, weight = 1 }) {
  return {
    id: "github_newest_user",
    title: "Newest GitHub User",
    weight,
    description: `
Using the GitHub API, search for users located in **Bangalore**
with **more than 50 followers**.

Identify the **newest account** and return its \`created_at\`
timestamp in ISO 8601 format.
    `,
    inputType: "text",
    expectedAnswerType: "string",
    checker: async (answer) => answer.includes("T"),
  };
}
