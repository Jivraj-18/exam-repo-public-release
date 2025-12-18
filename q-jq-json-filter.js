import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-filter";
  const title = "jq Filter JSON Array";

  const answer = 'jq ".[] | select(.age > 25)"';

  const question = html`
    <div class="mb-3">
      <p>
        Using <code>jq</code>, write a command to <strong>filter a JSON array 
        and select only objects where the age field is greater than 25</strong>.
      </p>
      <label for="${id}" class="form-label">jq command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
