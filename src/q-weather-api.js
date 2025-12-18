import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bbc-locationid";
  const title = "BBC Weather Location API";

  const answer = "locationId";

  const question = html`
    <div class="mb-3">
      <p>
        In the BBC Weather Locator API response, which field uniquely
        identifies a city and is required to fetch its weather forecast?
      </p>
      <label for="${id}" class="form-label">Field name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
