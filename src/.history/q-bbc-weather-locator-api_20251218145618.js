import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bbc-locator";
  const title = "BBC Weather Locator Service";

  const answer = "locationId";

  const question = html`
    <div class="mb-3">
      <p>
        The BBC Weather locator API returns a unique identifier
        for each city. What is the JSON key used for this identifier?
      </p>
      <label for="${id}" class="form-label">JSON key:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
