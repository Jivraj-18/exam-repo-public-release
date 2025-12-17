export default async function () {
  return {
    id: "24f2005753-fastapi-deploy",
    title: "Design a Deployed Analytics API",
    difficulty: 3,
    tags: ["fastapi", "deployment", "api-design"],

    description: `
You are building a FastAPI service that exposes sales analytics.

Tasks:
1. Design a POST endpoint to accept CSV data
2. Return total revenue and top-selling product
3. Mention one deployment consideration for production
    `,

    questions: [
      {
        id: "endpoint-design",
        text: "Explain the FastAPI endpoint design and deployment consideration.",
        type: "text",
      },
    ],
  };
}
