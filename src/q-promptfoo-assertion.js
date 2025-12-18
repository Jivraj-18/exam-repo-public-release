import { html } from "lit";

export default async function question({ weight = 1 } = {}) {
  return {
    id: "q-promptfoo-assertion",
    type: "code",
    weight,
    question: html`
      <h1>Promptfoo Assertions</h1>
      <p>
        You are writing a <code>promptfooconfig.yaml</code> to evaluate a classification model.
      </p>
      <p>
        <strong>Task:</strong> Write the <code>assertions</code> block to check that the model's output 
        contains <strong>both</strong> the words "Category:" and "Urgent" (case-sensitive).
      </p>
    `,
    answer: `assertions:
  - type: contains-all
    values:
      - "Category:"
      - "Urgent"`,
  };
}