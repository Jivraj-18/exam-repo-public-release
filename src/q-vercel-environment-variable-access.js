import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vercel-env";
  const title = "Access Environment Variable in Vercel";

  const answer = "os.environ.get('SECRET_KEY')";

  const question = html`
    <div class="mb-3">
      <p>
        In a Python FastAPI app deployed on <strong>Vercel</strong>,
        which expression safely reads an environment variable named
        <code>SECRET_KEY</code>?
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
