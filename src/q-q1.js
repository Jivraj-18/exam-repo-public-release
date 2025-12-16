export default function ({ weight = 1 }) {
  return {
    id: "q1",
    title: "JavaScript Reduce",
    weight,
    question: `
      What is the output of:
      <pre>[1, 2, 3].reduce((a, b) => a + b, 0)</pre>
    `,
    answer: "6",
  };
}
