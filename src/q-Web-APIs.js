import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-bbox";
  const title = "Nominatim Bounding Box";

  const answer = "boundingbox";

  const question = html`
    <div class="mb-3">
      <p>
        In the Nominatim API response, which JSON field contains
        the <strong>bounding box coordinates</strong> of a location?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
