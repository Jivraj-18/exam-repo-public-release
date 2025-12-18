import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-newest-user-advanced";
  const title = "Newest Active GitHub User (Advanced API Query)";

  const answer = "2024-11-03T06:42:19Z";

  const question = html`
    <div class="mb-3">
      <p>
        Using the <strong>GitHub Search API</strong>, find all users who:
      </p>
      <ul>
        <li>Are located in <strong>Berlin</strong></li>
        <li>Have <strong>more than 250 followers</strong></li>
        <li>Have <strong>at least 20 public repositories</strong></li>
      </ul>
      <p>
        From this filtered list, identify the <strong>newest account</strong>
        (based on <code>created_at</code>).
      </p>
      <p>
        Ignore users created <strong>after 2025-01-01</strong>.
      </p>
      <label for="${id}" class="form-label">
        Newest user <code>created_at</code> (ISO 8601):
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
