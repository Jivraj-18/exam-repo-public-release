import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tds-json-normalization";
  const title = "JSON Data Normalization";

  const answer = (response) => {
    const text = response.toLowerCase();
    if (!text.includes("normalize")) {
      throw new Error("Mention normalization");
    }
    if (!text.includes("reduce") && !text.includes("structure")) {
      throw new Error("Explain reducing redundancy or improving structure");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        JSON data often needs preprocessing before analysis.
      </p>
      <p>
        What does normalizing JSON data mean in data processing?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
