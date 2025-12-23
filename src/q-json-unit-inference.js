import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-unit-inference";
  const title = "Detect Unit Inconsistencies Automatically";

  const question = html`
    <div class="mb-3">
      <p>
        A JSONL file contains temperature measurements, but the <code>unit</code>
        field is unreliable or missing.
      </p>

      <pre>
{"value": 98, "unit": "C"}
{"value": 212, "unit": "F"}
{"value": 36.5}
      </pre>

      <p><strong>Task:</strong></p>
      <ul>
        <li>Infer units using <em>value distribution</em>, not the unit field</li>
        <li>Convert everything to Celsius</li>
        <li>Count how many rows were mislabelled</li>
      </ul>

      <p class="text-muted">
        Do NOT hardcode thresholds. Any JSON tools allowed.
      </p>

      <label for="${id}" class="form-label">Enter the number of mislabelled rows</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  const answer = (input) => {
    const n = Number(input);
    if (!Number.isInteger(n) || n < 0) {
      throw new Error("Answer must be a non-negative integer");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
