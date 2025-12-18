import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dom-data-attr";
  const title = "Hidden DOM Data Attribute";

  const answer = "392";

  const question = html`
    <div class="mb-3">
      <p>
        Open:
        <code>https://sanand0.github.io/tdsdata/hackable/data_attr.html</code>
      </p>
      <p>
        The visible table values are misleading.
        The <strong>true sum</strong> is embedded in a
        <code>data-total</code> attribute of a hidden DOM element.
      </p>
      <p>
        Inspect the DOM and extract the attribute value.
      </p>
      <label for="${id}" class="form-label">Total:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
