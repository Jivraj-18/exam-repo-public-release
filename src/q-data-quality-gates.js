import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-data-quality-gates";
  const title = "Data Quality Gates";

  const answer = "fail fast";

  const question = html`
    <div class="mb-3">
      <p>
        In data pipelines, what principle recommends stopping execution immediately
        when critical data validation checks fail?
      </p>
      <label for="${id}" class="form-label">Principle:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
