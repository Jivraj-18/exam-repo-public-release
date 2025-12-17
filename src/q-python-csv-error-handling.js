import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-csv-error-handling";
  const title = "Robust CSV Reading with Graceful Failure";

  const question = html`
    <div class="mb-3">
      <p>
        You are writing a Python script that reads a CSV file called
        <code>data.csv</code> using <code>pandas</code>.
      </p>

      <p>
        The file may:
      </p>
      <ul>
        <li>Not exist</li>
        <li>Be empty</li>
        <li>Have malformed rows</li>
      </ul>

      <p>
        Write a <strong>minimal Python try–except block</strong> that:
      </p>
      <ol>
        <li>Attempts to read the CSV using <code>pd.read_csv</code></li>
        <li>Prints <code>"EMPTY FILE"</code> if the file is empty</li>
        <li>Prints <code>"FILE NOT FOUND"</code> if the file does not exist</li>
        <li>Prints <code>"INVALID FORMAT"</code> for any other parsing error</li>
      </ol>

      <p class="mt-2">
        <strong>Answer format:</strong> Python code only (assume pandas is imported as <code>pd</code>).
      </p>

      <label for="${id}" class="form-label">Python code:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
        placeholder="try: ..."
      ></textarea>
    </div>
  `;

  const answer = null;

  return { id, title, weight, question, answer };
}
