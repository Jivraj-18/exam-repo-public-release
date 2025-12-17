import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ga4-vision-detail";
  const title = "Vision API Cost Optimization";

  const answer = "low";

  const question = html`
    <div class="mb-3">
      <p>
        When using the Vision API in GA4 tasks,
        which <code>detail</code> value should be used
        to reduce token usage while analyzing images?
      </p>
      <label for="${id}" class="form-label">Detail value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
