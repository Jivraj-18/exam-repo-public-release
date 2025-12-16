export default function ({ weight = 1 }) {
  return {
    id: "q1-node-thread",
    weight,
    question: `
Which Node.js component executes JavaScript code?
    `,
    answer: "Event Loop",
  };
}
