export default function ({ user, weight = 1 }) {
  return {
    id: "q_fastapi_query_params",
    title: "FastAPI: Query parameter handling",
    description: `
Create a GET endpoint /square
that accepts query parameter x
and returns x squared.
`,
    weight,
    evaluate: async ({ fetch }) => {
      const res = await fetch("/square?x=5");
      const data = await res.json();

      if (data.result !== 25) {
        throw new Error("Incorrect square calculation");
      }
    },
  };
}