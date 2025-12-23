import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-uv-run";
  const title = "Run Script with uv";

  const answer = "uv run scraper.py";

  const question = html`
    <div class="mb-3">
      <p>
        According to the Data Sourcing materials, what command uses the 
        <code>uv</code> tool to execute a Python script named <code>scraper.py</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}