import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim";
  const title = "Nominatim API Query";

  const answer =
    "https://nominatim.openstreetmap.org/search?city=Delhi&country=India&format=json";

  const question = html`
    <div class="mb-3">
      <p>
        Provide the <strong>Nominatim API URL</strong> to fetch geolocation
        data for the city <strong>Delhi</strong> in <strong>India</strong>
        in <strong>JSON format</strong>.
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
