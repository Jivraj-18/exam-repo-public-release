import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-mutation-testing";
  const title = "Testing AI-Generated Code Robustness";

  const answer = "mutmut";

  const question = html`
    <div class="mb-3">
      <p>
        AI-generated code may pass unit tests while still being logically fragile.
        To ensure tests actually <strong>fail when logic is altered</strong>,
        you introduce mutation testing into CI.
      </p>
      <p>
        Which <strong>Python mutation testing tool</strong> is commonly used
        to flip operators and literals to validate test strength?
      </p>
      <label for="${id}" class="form-label">Tool:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
