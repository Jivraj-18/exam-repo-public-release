import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";

  const question = html`
    <h4>Excel: Correlation Matrix</h4>
    <p>
      Which Excel feature is used to generate a correlation matrix efficiently?
    </p>
    <ol>
      <li>A. Pivot Tables</li>
      <li>B. Sparklines</li>
      <li>C. Data Analysis ToolPak</li>
      <li>D. Conditional Formatting</li>
    </ol>
    <input class="form-control" id="${id}" />
  `;

  const answer = async (value) => {
    if (value.trim().toUpperCase() !== "C") {
      throw new Error("Incorrect");
    }
    return true;
  };

  return { id, question, weight, answer };
}
