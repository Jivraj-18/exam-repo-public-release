import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-list-comprehension";
  const title = "Python List Comprehension";

  const answer = "[x**2 for x in range(10)]";

  const question = html`
    <div class="mb-3">
      <p>
        Write a Python list comprehension that creates a list of
        <strong>squares</strong> of numbers from <code>0</code> to <code>9</code>.
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
