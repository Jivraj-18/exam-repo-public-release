export default function ({ user, weight = 1 }) {
  return {
    id: "deployment-environment-drift",
    weight,
    type: "textarea",
    question: `
A FastAPI application runs locally but fails in production due to a missing dependency.

Explain what environment drift is and how deployment tools help prevent it.
    `,
    answer: `
Expected points:
• Difference between local and prod environments
• Role of containers or lock files
• Reproducible deployments
    `,
  };
}
