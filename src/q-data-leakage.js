import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-data-leakage";
  const title = "Identifying Data Leakage";

  const answer = "Future information";

  const question = html`
    <div class="mb-3">
      <p>
        A machine learning model achieves unrealistically high accuracy.
        Investigation shows that one feature was calculated using values
        from dates after the prediction target.
      </p>
      <p>
        What type of analytical error is this?
      </p>
      <label for="${id}" class="form-label">Error type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
