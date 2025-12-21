import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bbc-locator-url";
  const title = "BBC Weather Locator URL";

  const answer = "https://weather-broker-cdn.api.bbci.co.uk/en/observation/locations";

  const question = html`
    <div class="mb-3">
      <p>
        To fetch a BBC Weather <strong>locationId</strong> for a city, you must
        send a GET request to the BBC Weather <strong>locator service</strong>.
        What is the correct <strong>base URL</strong> (without query
        parameters) for that locator service?
      </p>
      <label for="${id}" class="form-label">Base URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
