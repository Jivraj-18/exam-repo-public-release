import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-data-analysis-toolpak";
  const title = "Excel Data Analysis ToolPak";
  const answer = "Data → Options → Add-ins → Analysis ToolPak";

  const question = html`
    <div class="mb-3">
      <p>
        You need to run <strong>Correlation</strong> and
        <strong>Regression</strong> in Excel but the option is missing.
        What is the correct menu path to enable the
        <strong>Analysis ToolPak</strong>?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}