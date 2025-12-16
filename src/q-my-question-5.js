export default function ({ weight = 1 }) {
  return {
    id: "q5-node-block",
    weight,
    question: `
What Node.js mechanism is blocked by CPU-intensive synchronous code?
    `,
    answer: "Event Loop",
  };
}
