import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

const formatNumbers = (values) => values.map((v) => Number(v.toFixed(2)));

const calcPopulationVariance = (values) => {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return variance;
};

const parseAnswer = (value) => {
  const num = Number(String(value).trim());
  if (!Number.isFinite(num)) throw new Error("Answer must be a number");
  return num;
};

export default async function({ user, weight = 0.5 }) {
  const id = "q-calc-variance";
  const title = "Calculate variance of a small sample";
  const random = seedrandom(`${user.email}#${id}`);

  const values = Array.from({ length: 6 }, () => Number((random() * 12 + 8).toFixed(2)));
  const variance = calcPopulationVariance(values);
  const expected = Number(variance.toFixed(3)); // use a small tolerance

  const question = html`
    <div class="mb-3">
      <h4>Spreadsheet sanity check: population variance</h4>
      <p>
        A PM exported a quick CSV into Sheets/Excel and wants to sanity check the population variance (not sample
        variance) of a metric. Use any tool (Sheets, Excel, Python, etc.) to compute the population variance of:
      </p>
      <pre><code>${formatNumbers(values).join(", ")}</code></pre>
      <p>Round your answer to <strong>three decimal places</strong>.</p>
      <label class="form-label" for="${id}">Population variance</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.001" placeholder="e.g. 4.237" required />
    </div>
  `;

  const answer = (value) => {
    const provided = parseAnswer(value);
    if (Math.abs(provided - expected) > 0.001) {
      throw new Error(`Expected variance ≈ ${expected}; got ${provided}`);
    }
    return true;
  };

  return { id, title, weight, question, answer };
}

