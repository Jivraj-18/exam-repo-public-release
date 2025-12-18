import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-pull-request-23f1000519";
  const title = "GitHub: Fork and Pull Request";

  const question = html`
    <div class="mb-3">
      <p>
        Fork a <strong>public GitHub repository</strong>.
        Make a small change to its <code>README.md</code> file.
      </p>
      <ol>
        <li>Commit the change to your fork.</li>
        <li>Create a Pull Request to the original repository.</li>
      </ol>
      <p>
        Enter the <strong>URL of the Pull Request</strong> you created.
      </p>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("Pull Request URL is required");
    if (!url.startsWith("https://github.com/")) {
      throw new Error("Must be a valid GitHub URL");
    }
    if (!url.includes("/pull/")) {
      throw new Error("URL must point to a Pull Request");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}