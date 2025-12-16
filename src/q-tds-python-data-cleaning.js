import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tds-python-data-cleaning";
  const title = "Python Data Cleaning";

  const answer = (response) => {
    const text = response.toLowerCase();
    if (!text.includes("missing") && !text.includes("null")) {
      throw new Error("Mention missing or null values");
    }
    if (!text.includes("clean")) {
      throw new Error("Explain cleaning process");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Real-world datasets are often messy.
      </p>
      <p>
        What is data cleaning in Python data analysis?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
