import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ weight = 1 }) {
  const id = "q-github-repo-stars";
  const title = "GitHub Repository Star Count";

  const question = html`
    <h4>GitHub REST API</h4>
    <p>
      Find the repository with the <strong>highest star count</strong> under the
      GitHub organization <code>vercel</code>.
    </p>
    <p>Return only the star count.</p>

    <input class="form-control" id="${id}" />
  `;

  const answer = async (output) => {
    if (!output.match(/^\d+$/)) {
      throw new Error("Expected numeric star count");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
