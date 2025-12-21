import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-bbox-field";
  const title = "Nominatim Bounding Box";

  const answer = "boundingbox";

  const question = html`
    <div class="mb-3">
      <p>
        The Nominatim API returns JSON for a city such as London, including its
        bounding box coordinates. Which <strong>JSON field name</strong>
        contains the array of <strong>min/max latitude and longitude</strong>
        values for that bounding box?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
