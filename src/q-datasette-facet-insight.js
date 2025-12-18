import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-datasette-facet-insight";
  const title = "Datasette Faceting Insight";
  const answer = "Completed orders only";

  const question = html`
    <div class="mb-3">
      <p>
        When analyzing revenue hotspots in Datasette,
        which <strong>order status filter</strong> should be applied
        before faceting by region and category to ensure valid revenue analysis?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
