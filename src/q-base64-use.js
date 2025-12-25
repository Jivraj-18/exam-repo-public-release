import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-base64-use";
  const title = "Base64 Encoding Use";

  const answer = "binary data";

  const question = html`
    <div class="mb-3">
      <p>
        Base64 encoding is primarily used to
        represent what kind of data in text form?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
