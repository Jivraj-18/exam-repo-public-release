import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-geo-haversine";
  const title = "Python: Haversine Distance Usage";

  const answer = "great-circle distance";

  const question = html`
    <div class="mb-3">
      <p>
        The Haversine formula is used in geospatial analysis to compute the ________
        between two latitude–longitude points on Earth.
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}