import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-bbox";
  const title = "Bounding Box from Nominatim";

  const answer = "boundingbox";

  const question = html`
    <div class="mb-3">
      <p>
        You are using the Nominatim API to fetch geolocation data for a city.
      </p>
      <p>
        Which JSON field contains the <strong>minimum and maximum latitude
        and longitude</strong> values?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
