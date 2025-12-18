import { html } from "lit-html";

export default async function({ user, weight = 1 }) {
  const id = "q-data-source";
  const title = "Identify Dataset Metadata";

  const answer = (input) => {
    const obj = JSON.parse(input);
    return obj.source && obj.rows > 0 && obj.columns > 0;
  };

  const question = html`
    <p>Provide dataset metadata as JSON:</p>
    <pre>{ "source": "...", "rows": number, "columns": number }</pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
