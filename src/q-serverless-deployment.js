import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vercel-env";
  const title = "Vercel Environment Variables";

  const answer = "vercel env add";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Vercel CLI command</strong> is used to securely add
        environment variables to a deployment?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
