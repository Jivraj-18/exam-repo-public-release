import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bbc-location-id";
  const title = "BBC Weather API";

  const answer = "locationId";

  const question = html`
    <div class="mb-3">
      <p>
        What key value is required to fetch detailed weather data
        from the <strong>BBC Weather API</strong> for a city?
      </p>
      <label for="${id}" class="form-label">Key name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
