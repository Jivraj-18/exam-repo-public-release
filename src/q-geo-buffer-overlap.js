import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-geo-buffer-overlap";
  const title = "Geospatial: Service Area Dissolve";

  const answer = "dissolve";

  const question = html`
    <div class="mb-3">
      <p>
        When creating 500m buffers around multiple delivery hubs to calculate total coverage, which operation is required to 
        <strong>merge overlapping circles</strong> into a single continuous polygon so that shared areas are not double-counted?
      </p>
      <label for="${id}" class="form-label">Operation Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}