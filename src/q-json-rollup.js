import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-rollup";
  const title = "JSON: Device Metric Aggregation";

  const answer = "67.82";

  const question = html`
    <div class="mb-3">
      <p>
        You are processing a large JSONL telemetry file where each record contains
        nested sensor metrics.
      </p>
      <p>
        Stream the file and filter records for devices whose ID starts with
        <code>alpha-</code> at <strong>Site-07</strong>.
        Ignore records with status <code>offline</code>.
      </p>
      <p>
        Temperatures may be reported in Celsius or Fahrenheit.
        Convert all readings to Celsius before aggregation.
      </p>
      <p>
        What is the <strong>average temperature</strong> for the filtered records,
        rounded to two decimals?
      </p>
      <label for="${id}" class="form-label">Average temperature (°C):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
