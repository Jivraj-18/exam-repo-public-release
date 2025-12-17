import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-error";
  const title = "Python: JSON Error Handling";

  const answer = async (response) => {
    if (!response || response.trim().length < 15) {
      throw new Error("Explain the error and a safe way to handle missing keys.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A Python function attempts to access a key that does not exist
        in a JSON object.
      </p>

      <ol>
        <li>What runtime error occurs in this situation?</li>
        <li>How can the function be rewritten to avoid crashing?</li>
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
