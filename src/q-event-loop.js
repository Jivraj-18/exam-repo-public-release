import { html } from "lit";

export default function ({ weight = 0.8 }) {
  return {
    id: "event-loop-order",
    title: "JavaScript: Event Loop Ordering",
    weight,
    prompt: html`
      <p>
        What is the exact output order of this code?
      </p>
      <pre><code>
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");
      </code></pre>
      <p>
        Write the output as a single string without spaces (example: <code>ABCDE</code>).
      </p>
    `,
    type: "text",
    answer: (v) => v.trim() === "AECDB",
    explanation: html`
      <p>
        Sync → Microtasks → Macrotasks.
        Order: A, E, C, D, B.
      </p>
    `,
  };
}
