import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-detail";
  const title = "Vision API Token Cost";

  const answer = "low";

  const question = html`
    <div class="mb-3">
      <p>
        You are sending an image to <code>gpt-4o-mini</code> for analysis. You do not need 
        high-resolution analysis, and you want to minimize token costs (using fewer tokens).
      </p>
      <p>
        In the <code>image_url</code> object, what value should you set the <code>detail</code> parameter to?
      </p>
      <label for="${id}" class="form-label">Detail setting:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}