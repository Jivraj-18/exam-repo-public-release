import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-mutation-test";
  const title = "Mutation Testing Tool";

  const answer = "mutmut";

  const question = html`
    <div class="mb-3">
      <p>
        In the section on "Coverage and mutation guardrails", which Python tool is 
        recommended to flip operators and literals to expose brittle assertions?
      </p>
      <label for="${id}" class="form-label">Tool Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}