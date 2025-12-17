import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vercel-cmd";
  const title = "Vercel Production Deploy";

  const answer = "npx vercel --prod";

  const question = html`
    <div class="mb-3">
      <p>
        Which command deploys a Vercel project
        <strong>to production</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
