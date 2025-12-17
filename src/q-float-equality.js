import { html } from "lit";

export default function ({ weight = 0.6 }) {
  return {
    id: "float-equality-trap",
    title: "JavaScript: Floating Point Equality",
    weight,
    prompt: html`
      <p>
        In JavaScript, what is the value of the following expression?
      </p>
      <pre><code>
Number.EPSILON + 1 === 1
      </code></pre>
      <p>
        Answer exactly <code>true</code> or <code>false</code>.
      </p>
    `,
    type: "text",
    answer: (v) => v.trim() === "false",
    explanation: html`
      <p>
        <code>Number.EPSILON</code> is the smallest difference between 1 and the next representable number.
        Adding it to 1 changes the value, so strict equality fails.
      </p>
    `,
  };
}
