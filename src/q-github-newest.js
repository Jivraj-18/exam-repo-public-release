import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-newest";
  const title = "Find Newest GitHub User";

  const answer = 'users.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0].created_at';

  const question = html`
    <div class="mb-3">
      <p>
        Given an array of GitHub user objects in <code>users</code>,
        write a JavaScript expression that returns the
        <strong>creation date</strong> of the <strong>newest account</strong>.
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
