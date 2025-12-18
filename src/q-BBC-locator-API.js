import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bbc-locator";
  const title = "BBC Weather Locator API";

  const answer =
    "https://locator-service.api.bbci.co.uk/locations?search=Paris&format=json";

  const question = html`
    <div class="mb-3">
      <p>
        Provide the <strong>BBC Weather Locator API URL</strong>
        used to search for the city <strong>Paris</strong>
        and return results in <strong>JSON format</strong>.
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
