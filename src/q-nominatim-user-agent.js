import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-header";
  const title = "Nominatim API Headers";

  const answer = "User-Agent";

  const question = html`
    <div class="mb-3">
      <p>
        When using the Nominatim API with Python to avoid HTTP Error 403, 
        which specific HTTP header must be customized with your app name 
        or email address instead of using the default "myGeocoder"?
      </p>
      <label for="${id}" class="form-label">Header Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}