import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-path-23f1000519";
  const title = "JSON: Extract Value from Nested Structure";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSON document containing nested objects and arrays.
      </p>
      <p>
        Extract the value located at the following JSON path:
      </p>
      <pre><code>$.orders[2].items[1].price</code></pre>
      <p>
        Paste <strong>only the extracted value</strong>. Do not include quotes or any extra text.
      </p>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
      />
    </div>
  `;

  const answer = async (value) => {
    if (!value) throw new Error("Extracted value is required");
    if (isNaN(Number(value))) {
      throw new Error("Answer must be a numeric value");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
