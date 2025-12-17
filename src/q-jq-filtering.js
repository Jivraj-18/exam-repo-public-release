import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-filter";
  const title = "JSON: Filter active users";

  const answer = "jq '.[] | select(.active == true) | .email' users.json";

  const question = html`
    <div class="mb-3">
      <p>
        You have a JSON array in <code>users.json</code> where each object has
        fields <code>email</code> and <code>active</code>.
      </p>
      <p>
        Which <code>jq</code> command extracts the email addresses of only
        <strong>active users</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
