import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-phone";
  const title = "Regex Phone Number";

  const answer = "^\\d{3}-\\d{3}-\\d{4}$";

  const question = html`
    <div class="mb-3">
      <p>
        Write a regular expression pattern that matches phone numbers in the format 
        <strong>123-456-7890</strong> (exactly 3 digits, dash, 3 digits, dash, 4 digits).
      </p>
      <label for="${id}" class="form-label">Regex pattern:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
