export default {
  id: "q_fastapi_arithmetic",
  title: "FastAPI: Arithmetic endpoint",
  description: `
Create POST /compute that accepts {a, b}
and returns sum and product.
`,
  evaluate: async ({ fetch }) => {
    const res = await fetch("/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 3, b: 4 })
    });

    const data = await res.json();
    if (data.sum !== 7 || data.product !== 12) {
      throw new Error("Wrong output");
    }
  },
};
