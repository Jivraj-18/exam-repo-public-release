import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-unit-normalization";
    const title = "JSON: Normalize sensor units";

    const expected = "42.50";

    const answer = async () => {
        const v = document.getElementById(id).value.trim();
        if (v !== expected) throw new Error("Incorrect average");
        return true;
    };

    const question = html`
    <p>
      A JSONL sensor feed mixes Celsius and Fahrenheit readings.
    </p>
    <p>
      After converting all values to Celsius and excluding <code>offline</code> records,
      the average temperature is:
    </p>
    <input id="${id}" class="form-control" placeholder="e.g. 23.45" />
  `;

    return { id, title, weight, question, answer };
}