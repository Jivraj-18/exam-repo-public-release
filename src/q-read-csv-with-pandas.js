import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-readcsv";
  const title = "Python: Read CSV with Pandas";

  const answer = "pd.read_csv";

  const question = html`
    <div class="mb-3">
      <p>
        Which Pandas function is used to <strong>load a CSV file</strong> into a
        DataFrame?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
