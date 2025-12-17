import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-data-validation";
  const title = "FastAPI: Input Data Validation";

  const answer = async (response) => {
    if (!response || response.trim().length < 25) {
      throw new Error("Please explain why dictionaries are unreliable and how Pydantic helps.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A FastAPI endpoint accepts user registration data such as
        <code>username</code>, <code>email</code>, and <code>age</code>.
      </p>

      <ol>
        <li>Why is validating input using plain Python dictionaries unreliable?</li>
        <li>How do Pydantic models improve input validation?</li>
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
