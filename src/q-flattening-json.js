import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-normalize";
  const title = "Pandas: Flattening JSON";

  const answer = "json_normalize";

  const question = html`
    <div class="mb-3">
      <p>
        You have a DataFrame column containing nested JSON objects. Which
        specific <strong>Pandas function</strong> helps flatten semi-structured
        JSON data into a flat table?
      </p>
      <label for="${id}" class="form-label">Function Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
