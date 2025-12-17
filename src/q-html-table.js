import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-table";
  const title = "HTML Table Element";

  const answer = "table";

  const question = html`
    <div class="mb-3">
      <p>
        Which HTML tag is used to define a <strong>table</strong> for displaying
        data in rows and columns?
      </p>
      <label for="${id}" class="form-label">HTML Tag:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
