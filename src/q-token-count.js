import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-token-count";
  const title = "Estimate Token Count";

  const text = "Fast shipping and great service";

  const answer = async () => {
    const val = Number(document.getElementById(id).value);
    const expected = text.split(" ").length;
    if (val !== expected) {
      throw new Error("Incorrect token estimate");
    }
    return true;
  };

  const question = html`
    <p>
      Estimate the number of tokens by counting words in this sentence:
    </p>
    <blockquote>${text}</blockquote>
    <input id="${id}" type="number" class="form-control" />
  `;

  return { id, title, question, answer };
}
