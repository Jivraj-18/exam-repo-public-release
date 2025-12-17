

export default function ({ weight = 1 }) {
  return {
    id: "time_complexity",
    question: html`
      <p>
        Consider the following pseudocode:
      </p>
      <pre>
for i = 1 to n:
  j = 1
  while j <= n:
    j = j * 2
      </pre>
      <p>What is the time complexity?</p>
      <p><b>Answer using Big-O notation (e.g., O(n log n))</b></p>
    `,
    answer: "O(n log n)",
    weight,
  };
}
