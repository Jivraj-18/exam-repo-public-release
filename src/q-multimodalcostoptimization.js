import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-detail";
  const title = "Vision Model Cost Control";

  const answer = "low";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image to an OpenAI vision-enabled model,
        which <code>detail</code> value minimizes token usage
        while still allowing basic image understanding?
      </p>
      <label for="${id}" class="form-label">detail value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
