import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-format";
  const title = "Nominatim API Integration";

  const answer = "format=json";

  const question = html`
    <div class="mb-3">
      <p>
        When querying the <strong>Nominatim API</strong> to retrieve city coordinates 
        programmatically, which query parameter must be appended to the URL to ensure 
        the response is returned as a <strong>machine-readable JSON object</strong>?
      </p>
      <label for="${id}" class="form-label">Query Parameter:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="key=value" />
    </div>
  `;

  return { id, title, weight, question, answer };
}