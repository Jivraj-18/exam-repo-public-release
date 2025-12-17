import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-env-variables";
  const title = "Deployment: Environment Variables";

  const answer = async (response) => {
    if (!response || response.trim().length < 20) {
      throw new Error("Explain why the error appears after deployment and how to access env variables safely.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A FastAPI application works correctly on a local machine but fails
        after deployment with the error:
      </p>

      <pre><code>KeyError: 'API_KEY'</code></pre>

      <ol>
        <li>Why does this error often occur only after deployment?</li>
        <li>How should environment variables be accessed safely in Python?</li>
      </ol>

      <label for="${id}" class="form-label">Your answer</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="4"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
