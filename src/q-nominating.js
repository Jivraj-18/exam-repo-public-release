import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-nominatim";
  const title = "Bounding Box from Nominatim API";

  const answer = "boundingbox";

  const question = html`
    <div class="mb-3">
      <p>
        Which field in the <strong>Nominatim API response</strong>
        contains the minimum and maximum latitude and longitude?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
