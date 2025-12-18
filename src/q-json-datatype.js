import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-datatype";
  const title = "JSON: Valid Data Type";

  const answer = "boolean";

  const question = html`
    <div class="mb-3">
      <p>
        Which of the following is a <strong>valid native data type</strong>
        supported directly in JSON?
      </p>
      <p><em>Answer with one word only.</em></p>
      <label for="${id}" class="form-label">Data type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
