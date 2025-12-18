import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-number";
  const title = "Convert String to Number";

  const answer = "Number";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript function converts a string
        like <code>"42"</code> into a number?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
