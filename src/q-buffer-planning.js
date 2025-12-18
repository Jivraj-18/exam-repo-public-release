import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-buffer-planning";
  const title = "Optimizing Urban Coverage";
  const answer = "Buffer";
  const question = html`
    <div class="mb-3">
      <p>A city planner is using QGIS to ensure that every resident lives within 15 minutes of a public park. To visualize the "serviceable area" around existing park coordinates as circular zones of a fixed radius, which geoprocessing tool should they run?</p>
      <label for="${id}" class="form-label">QGIS Tool Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. Clip" />
    </div>
  `;

  return { id, title, weight, question, answer };
}