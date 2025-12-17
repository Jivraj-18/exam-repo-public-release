import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-datasette-feature";
  const title = "Datasette Exploration";

  const answer = "Facets";

  const question = html`
    <div class="mb-3">
      <p>
        According to the "Datasette: Facet Revenue Hotspot" section, what is the name of the 
        "killer feature" in Datasette that shows the distribution of values in a column 
        (e.g., counts of 'completed' vs 'pending') and allows for instant filtering?
      </p>
      <label for="${id}" class="form-label">Feature Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}