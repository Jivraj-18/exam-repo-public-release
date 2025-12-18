import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-pandas-read-function";
    const title = "Pandas Read Function";

    const random = seedrandom(`${user.email}#${id}`);
    const formats = [
        { type: "CSV", ext: "csv", func: "read_csv" },
        { type: "JSON", ext: "json", func: "read_json" },
        { type: "Excel", ext: "xlsx", func: "read_excel" }
    ];
    const choice = formats[Math.floor(random() * formats.length)];
    const answer = choice.func;

    const question = html`
    <div class="mb-3">
      <p>Which <strong>pandas</strong> function is used to read a <strong>${choice.type}</strong> file (extension <code>.${choice.ext}</code>)?</p>
      <p>Enter only the function name (e.g. <code>read_csv</code>).</p>
      
      <label for="${id}" class="form-label">Answer</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
