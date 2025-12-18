import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-json-streaming";
  const title = "JSON: Streaming advantage";

  const expected = "memory";

  const answer = async () => {
    const v = document.getElementById(id).value.trim().toLowerCase();
    if (v !== expected) throw new Error("Incorrect");
    return true;
  };

  const question = html`
    <p>
      Streaming JSON avoids loading entire files into what?
    </p>
    <input id="${id}" class="form-control" />
  `;

  return { id, title, weight: 1, question, answer };
}
