import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-haversine";
  const title = "Haversine Distance Formula";

  const answer = "Haversine";

  const question = html`
    <div class="mb-3">
      <p>
        Which mathematical formula is used to calculate
        <strong>great-circle distance</strong> between two latitude–longitude
        points on Earth?
      </p>
      <label for="${id}" class="form-label">Formula name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
