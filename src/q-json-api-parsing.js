import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-filter";
  const title = "Filter JSON with jq";

  const answer = "jq '.items[].id'";

  const question = html`
    <div class="mb-3">
      <p>
        You receive a JSON response with an array named <code>items</code>.
        Which <strong>jq</strong> expression extracts all <code>id</code> fields
        from every object inside that array?
      </p>
      <label for="${id}" class="form-label">jq expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
