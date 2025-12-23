import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sqlite-open";
  const title = "Open SQLite Database";

  const answer = "sqlite3 sales.db";

  const question = html`
    <div class="mb-3">
      <p>
        Which command opens an SQLite database file named
        <strong>sales.db</strong> in the interactive SQLite shell?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
