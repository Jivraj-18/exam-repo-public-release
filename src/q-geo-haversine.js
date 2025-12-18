import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-geo-haversine";
    const title = "Haversine Distance Formula";

    const answer = "6371";

    const question = html`
    <div class="mb-3">
      <p>
        In the Haversine distance formula,
        what is the <strong>approximate radius of Earth</strong>
        used for distance calculation (in kilometers)?
      </p>
      <label for="${id}" class="form-label">Value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
