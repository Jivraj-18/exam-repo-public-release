export default function ({ user, elementMap }) {
  return {
    id: "fastapi-orders",

    title: "FastAPI Order Processing with Validation",

    difficulty: "moderate",

    tags: ["fastapi", "pydantic", "validation"],

    prompt: `
Create a FastAPI POST endpoint /orders.

The endpoint should:
- Accept product_id, quantity, and price_per_unit
- Validate inputs using Pydantic
- Compute total_price
- Return total_price in the response
    `,

    validate: ({ response }) => {
      return response && typeof response.total_price === "number";
    }
  };
}
