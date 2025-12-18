import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
    const id = "q-data-imputation";
    const title = "Data cleaning: Imputation rule";

    const expected = "revenue";

    const answer = async () => {
        const v = document.getElementById(id).value.trim().toLowerCase();
        if (v !== expected) throw new Error("Incorrect base field");
        return true;
    };

    const question = html`
    <p>
      Missing expense values are filled as a percentage of which column?
    </p>
    <input id="${id}" class="form-control" />
  `;

    return { id, title, weight: 1, question, answer };
}