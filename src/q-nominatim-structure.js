import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-structure";
  const title = "Nominatim Bounding Box";

  const answer = "boundingbox";

  const question = html`
    <div class="mb-3">
      <p>
        In the JSON response from the <strong>Nominatim API</strong>, which specific <strong>key</strong> contains 
        an array of four strings representing the southern latitude, northern latitude, western longitude, and eastern longitude?
      </p>
      <label for="${id}" class="form-label">JSON Key Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}