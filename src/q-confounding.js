import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-confounding";
  const title = "Confounding Variable Detection";

  const answer = "Hidden confounder";

  const question = html`
    <div class="mb-3">
      <p>
        An analysis shows a strong relationship between feature X and outcome Y.
        After controlling for variable Z, the relationship disappears.
      </p>
      <p>
        What was variable Z acting as?
      </p>
      <label for="${id}" class="form-label">Role of Z:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
