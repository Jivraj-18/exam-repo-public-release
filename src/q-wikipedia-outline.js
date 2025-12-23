import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-outline-endpoint";
  const title = "Country Outline API";

  const answer = "/api/outline?country=India";

  const question = html`
    <div class="mb-3">
      <p>
        You built a FastAPI service that exposes a single endpoint
        <code>/api/outline</code> which accepts a
        <code>country</code> query parameter and returns a Markdown outline of
        the country’s Wikipedia page. What is the full
        <strong>path and query string</strong> you would call for
        <strong>India</strong>?
      </p>
      <label for="${id}" class="form-label">Path + query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
