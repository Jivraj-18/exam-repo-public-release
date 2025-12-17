import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-css-selector-links";
  const title = "CSS Selector for External Links";

  const answer = "a[href^=\"http\"]";

  const question = html`
    <div class="mb-3">
      <p>
        Which CSS selector selects <strong>all anchor tags</strong>
        whose links start with <strong>http</strong> on a web page?
      </p>
      <label for=${id} class="form-label">CSS Selector:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
