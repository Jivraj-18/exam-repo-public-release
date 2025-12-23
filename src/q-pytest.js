import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pytest-run";
  const title = "Run Pytest Suite";

  const answer = "pytest";

  const question = html`
    <div class="mb-3">
      <p>
        Which single-word command automatically discovers and runs all 
        test files (like <code>test_streak.py</code>) in the current directory?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}