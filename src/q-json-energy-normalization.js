import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-energy-normalization";
  const title = "JSON: Normalize Energy Readings";

  const answer = "__NUMERIC_KWH__"; // Expected kWh value

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSONL stream of smart-meter readings where power
        is reported in <strong>watts</strong> or <strong>kilowatts</strong>.
      </p>
      <ul>
        <li>Filter for <strong>residential</strong> meters</li>
        <li>Zone: <strong>Zone-3</strong></li>
        <li>Time period: <strong>April 2024</strong></li>
      </ul>
      <p>
        Normalize all readings and compute the
        <strong>average daily consumption (kWh)</strong>.
      </p>
      <label for="${id}" class="form-label">
        Average daily consumption (kWh):
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
