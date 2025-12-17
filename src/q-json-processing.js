import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 1: JSON Processing
export async function question1({ user, weight = 1 }) {
  const id = "q-json-parse";
  const title = "JSON Data Extraction";

  const answer = "42";

  const question = html`
    <div class="mb-3">
      <p>
        Given the following JSON string:
        <code>{"user": {"name": "Alice", "settings": {"theme": "dark", "notifications": 42}}}</code>
      </p>
      <p>
        Using Python's <code>json</code> module, what value would you get from
        <code>data['user']['settings']['notifications']</code>?
      </p>
      <label for="${id}" class="form-label">Value:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}