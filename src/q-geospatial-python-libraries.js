import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function ({ user, weight = 1 }) {
  const id = "q-geo-geopandas";
  const title = "Python Geospatial Tools";

  const answer = "GeoPandas";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python library extends <strong>Pandas</strong> to allow spatial 
        operations on geometric types?
      </p>
      <label for="${id}" class="form-label">Library Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}