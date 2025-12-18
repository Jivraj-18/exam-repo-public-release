import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-useragent";
  const title = "Nominatim API User Agent";

  const answer = "user_agent";

  const question = html`
    <div class="mb-3">
      <p>
        When using the Nominatim geocoding service from the geopy library,
        what parameter must you provide to identify your application?
      </p>
      <p>
        Example: <code>Nominatim(______="myApp")</code>
      </p>
      <label for="${id}" class="form-label">Parameter name:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Hint: This is required by Nominatim's usage policy
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}