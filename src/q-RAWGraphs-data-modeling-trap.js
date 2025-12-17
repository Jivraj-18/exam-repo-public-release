import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-rawgraphs-flow";
  const title = "RAWGraphs Alluvial Data Constraint";

  const answer = "source target value";

  const question = html`
    <div class="mb-3">
      <p>
        To correctly render an Alluvial Diagram in RAWGraphs,
        the dataset must minimally contain three columns representing
        flow structure.
        What are the exact three required fields,
        in order, separated by spaces?
      </p>
      <label for="${id}" class="form-label">Fields:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
