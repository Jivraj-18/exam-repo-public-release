import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-pdf-table-filter";
  const title = "PDF: Table filtering logic";

  const expected = "physics";

  const answer = async () => {
    const v = document.getElementById(id).value.trim().toLowerCase();
    if (v !== expected) throw new Error("Incorrect subject");
    return true;
  };

  const question = html`
    <p>
      You filter students with Maths ≥ 40 and sum another column.
    </p>
    <p>
      Which subject column is summed?
    </p>
    <input id="${id}" class="form-control" />
  `;

  return { id, title, weight: 1, question, answer };
}
