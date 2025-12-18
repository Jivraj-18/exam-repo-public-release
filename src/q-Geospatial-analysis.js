import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-geo-haversine";
  const title = "Haversine Distance Purpose";

  const answer = "distance between two latitude-longitude points";

  const question = html`
    <div class="mb-3">
      <p>
        The Haversine formula is widely used in Python-based geospatial analysis.
      </p>
      <p>
        What does the Haversine formula compute?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
