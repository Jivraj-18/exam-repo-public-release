import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-json-key";
  const title = "Read Value from JSON in Python";

  const answer = "data[\"temperature\"]";

  const question = html`
    <div class="mb-3">
      <p>
        A weather API returns a JSON object stored in a Python variable
        <code>data</code>. The JSON looks like:
      </p>
      <pre>
{
  "city": "Chennai",
  "temperature": 31,
  "unit": "C"
}
      </pre>
      <p>
        In pure <strong>Python</strong>, write the expression that accesses the
        <strong>temperature value</strong> from this JSON object.
      </p>
      <label for="${id}" class="form-label">Python expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
