import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-async";
  const title = "Async Function in JavaScript";

  const answer = "async";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript keyword is used to define an asynchronous function?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
