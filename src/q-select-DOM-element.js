import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-query-selector";
  const title = "Select DOM Element";

  const answer = "document.querySelector";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript method selects the first HTML element
        that matches a CSS selector?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
