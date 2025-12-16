export default function ({ weight = 1 }) {
  return {
    id: "q2-http-idempotent",
    weight,
    question: `
Which HTTP method is idempotent and commonly used to update a resource?
    `,
    answer: "PUT",
  };
}
