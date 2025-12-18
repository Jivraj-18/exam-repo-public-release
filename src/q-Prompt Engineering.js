import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-prompt-yes-attack";
  const title = "Prompt Engineering: Constraint Bypass";

  const answer = "Yes";

  const question = html`
    <div class="mb-3">
      <p>
        An LLM has been instructed to <strong>never say the word “Yes”</strong>.
        You are attempting to bypass this using prompt engineering.
      </p>
      <p>
        What single word must appear in the model output for you to succeed?
      </p>
      <label for="${id}" class="form-label">Required word:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
