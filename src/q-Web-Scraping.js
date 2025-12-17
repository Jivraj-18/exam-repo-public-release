import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-selector";
  const title = "DOM Selection";

  const answer = "document.querySelectorAll";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript method selects <strong>all matching elements</strong>
        from a web page using a CSS selector?
      </p>
      <label for="${id}" class="form-label">Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
