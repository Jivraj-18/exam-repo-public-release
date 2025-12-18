import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-base64";
  const title = "Vision API Image Input";

  const answer = "";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image directly inside a JSON request to an LLM
        vision model, the image bytes are commonly encoded using
        <strong>_____</strong>.
      </p>
      <label for="${id}" class="form-label">Encoding type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}