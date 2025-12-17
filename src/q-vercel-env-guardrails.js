import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "vercel_env_guardrails";
  const title = "Vercel: Environment Guardrails";

  const answer = "ENVIRONMENT";

  const question = html`
    <div class="mb-3">
      <p>
        A FastAPI app deployed on Vercel must fail fast unless it is running
        in the <code>production</code> environment.
      </p>
      <p>
        Write a Python <code>if</code> check that raises an exception if
        <code>ENVIRONMENT</code> is not set to <code>\"production\"</code>.
      </p>
      <label for="${id}" class="form-label">Python code:</label>
      <textarea class="form-control" id="${id}" name="${id}"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
