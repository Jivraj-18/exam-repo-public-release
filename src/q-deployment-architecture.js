export default function ({ user, weight = 1 }) {
  return {
    id: "deployment-architecture",
    weight,
    prompt: `
Author a **Markdown deployment architecture note** describing how a data product
moves from staging to production. Include:

- Edge cache
- API tier
- Background workers
- A Mermaid diagram

Title must be: **Project 20-rupZ Deployment**
    `,
    answerType: "markdown",
    validate: (md) =>
      md.includes("Project 20-rupZ Deployment") &&
      md.includes("mermaid"),
  };
}
