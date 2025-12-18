import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-html-markdown";
  const title = "HTML to Markdown conversion";

  const expected = "|";

  const answer = async () => {
    const v = document.getElementById(id).value.trim();
    if (v !== expected) throw new Error("Incorrect symbol");
    return true;
  };

  const question = html`
    <p>
      In Markdown tables, which character separates columns?
    </p>
    <input id="${id}" class="form-control" />
  `;

  return { id, title, weight: 1, question, answer };
}
