import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function ({ user, weight = 1 }) {
  const id = "q-python-dropna";
  const title = "Pandas Data Cleaning";

  const answer = "df.dropna()";

  const question = html`
    <div class="mb-3">
      <p>
        In a Pandas DataFrame named <strong>df</strong>, which method is used to 
        remove all rows that contain at least one <strong>NaN</strong> (missing) value?
      </p>
      <label for="${id}" class="form-label">Method Call:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., df.method()"/>
    </div>
  `;

  return { id, title, weight, question, answer };
}