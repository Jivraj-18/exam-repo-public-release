import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rate-limit";
  const title = "APIs: Rate Limiting and 429 Errors";

  const answer = async (response) => {
    if (!response || response.trim().length < 20) {
      throw new Error("Explain HTTP 429 errors and methods to prevent them.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        An application frequently encounters the following error
        while calling an external LLM API:
      </p>

      <pre><code>HTTP 429: Too Many Requests</code></pre>

      <ol>
        <li>What does an HTTP 429 error indicate?</li>
        <li>Mention two techniques to reduce the chances of this error.</li>
      </ol>

      <label for="${id}" class="form-label">Your answer</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="3"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
