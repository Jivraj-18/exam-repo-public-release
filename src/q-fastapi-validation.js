export default function ({ user, weight = 1 }) {
  return {
    id: "fastapi_validation",
    weight,
    title: "FastAPI Input Validation",
    question: `
In FastAPI, which library is used internally to perform
automatic request body validation?
    `,
    type: "mcq",
    options: [
      "Marshmallow",
      "Cerberus",
      "Pydantic",
      "Django Forms"
    ],
    answer: "Pydantic"
  };
}
