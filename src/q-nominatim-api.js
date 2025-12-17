import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-api";
  const title = "Nominatim API Call";

  const answer = "https://nominatim.openstreetmap.org/search?q=Paris,France&format=json";

  const question = html`
    <div class="mb-3">
      <p>
        What is the complete URL to query the Nominatim API for geocoding "Paris, France" 
        and get the response in JSON format?
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" 
             placeholder="https://nominatim.openstreetmap.org/..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}