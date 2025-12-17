import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "github_actions_release_tag";
  const title = "GitHub Actions: Release Tag Trigger";

  const answer = "v*";

  const question = html`
    <div class="mb-3">
      <p>
        Configure a GitHub Actions workflow so it runs
        <strong>only when a tag starting with <code>v</code></strong> is pushed.
      </p>
      <p>
        Write only the <code>on:</code> section of the workflow YAML.
      </p>
      <label for="${id}" class="form-label">YAML:</label>
      <textarea class="form-control" id="${id}" name="${id}"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
