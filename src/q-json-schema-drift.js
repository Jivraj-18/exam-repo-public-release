import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-schema-drift";
  const title = "JSON Schema Drift";

  const answer = "schema drift";

  const question = html`
    <div class="mb-3">
      <p>
        When an API starts adding or removing fields in its JSON responses over time,
        this problem is known as what?
      </p>
      <label for="${id}" class="form-label">Term:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
