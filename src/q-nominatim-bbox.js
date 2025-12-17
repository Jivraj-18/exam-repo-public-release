import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nominatim-bbox";
  const title = "Extract Bounding Box";

  const answer = 'parseFloat(result.boundingbox[1])';

  const question = html`
    <div class="mb-3">
      <p>
        Given a Nominatim API JSON result stored in variable <code>result</code>,
        write a JavaScript expression to extract the
        <strong>maximum latitude</strong> from the <code>boundingbox</code>.
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
