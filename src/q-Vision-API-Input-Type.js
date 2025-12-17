import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-base64";
  const title = "Vision API Image Encoding";

  const answer = "base64";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image directly inside a JSON request to an LLM Vision API,
        the image is commonly encoded using <strong>_____</strong>.
      </p>
      <label for="${id}" class="form-label">Encoding format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
