import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-pandas-mean";
    const title = "Pandas Mean";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate random data
    const values = Array.from({ length: 5 }, () => Math.floor(random() * 100));
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const answer = mean;

    const dataset = values.map((v, i) => `${i},${v}`).join("\\n");

    const question = html`
    <div class="mb-3">
      <p>You have a DataFrame <code>df</code> created from the following CSV data (columns: id, score):</p>
      <pre>id,score\n${dataset}</pre>
      <p>
        What is the output of <code>df['score'].mean()</code>?
      </p>
      
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="any" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
