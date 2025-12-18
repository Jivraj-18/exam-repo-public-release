import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
//question 4
export default async function ({ user, weight = 1 }) {
  const id = "q-vision-input";
  const title = "LLM Vision Input";

  const answer = "image_url";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image to an OpenAI vision model, what is the
        <strong>content type key</strong> used alongside text inside
        the user message?
      </p>
      <label for="${id}" class="form-label">Key name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
