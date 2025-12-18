import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-seaborn-violin";

  const question = html`
    <h4>Seaborn: Distribution Visualization</h4>
    <p>
      Which Seaborn plot best represents both distribution shape
      and density across categories?
    </p>
    <ol>
      <li>A. barplot</li>
      <li>B. countplot</li>
      <li>C. boxplot</li>
      <li>D. violinplot</li>
    </ol>
    <input class="form-control" id="${id}" />
  `;

  const answer = async (value) => {
    if (value.trim().toUpperCase() !== "D") {
      throw new Error("Incorrect");
    }
    return true;
  };

  return { id, question, weight, answer };
}
