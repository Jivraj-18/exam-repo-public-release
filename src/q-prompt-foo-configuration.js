import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-promptfoo";
  const title = "PromptFoo Assertions";

  const answer = "llm-rubric";

  const question = html`
    <div class="mb-3">
      <p>
        In <code>promptfooconfig.yaml</code>, you want to grade an LLM's response based on 
        subjective criteria (e.g., "Is the tone professional?").
      </p>
      <p>
        Which specific assertion type allows you to provide natural language instructions 
        to a "grader" model to evaluate the output?
      </p>
      <label for="${id}" class="form-label">Assertion Type:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}