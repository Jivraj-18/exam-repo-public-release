import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-etag";
  const title = "GitHub API Conditional Requests";

  const answer = "If-None-Match";

  const question = html`
    <div class="mb-3">
      <p>
        You are building an AI agent that frequently queries the GitHub REST API.
        To <strong>reduce rate-limit usage</strong>, the agent must avoid downloading
        unchanged responses.
      </p>
      <p>
        Which <strong>HTTP request header</strong> should the agent send so GitHub
        can return <code>304 Not Modified</code> when cached data is still valid?
      </p>
      <label for="${id}" class="form-label">HTTP header:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
