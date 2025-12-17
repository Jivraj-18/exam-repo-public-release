import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-api-debugging";
  const title = "FastAPI: Debugging 422 Errors";

  const answer = async (response) => {
    if (!response || response.trim().length < 30) {
      throw new Error("Please explain the cause of 422 errors and the role of validation.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A FastAPI endpoint returns a
        <code>422 Unprocessable Entity</code> error
        even when a valid-looking JSON request is sent using <code>curl</code>.
      </p>

      <ol>
        <li>Explain why FastAPI returns a 422 error.</li>
        <li>Explain how request validation helps prevent this issue.</li>
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
