import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-svg-bar-chart-fix";
  const title = "Fix a broken SVG chart";

  const answer = async () => {
    const file = document.getElementById(id).files[0];
    if (!file) throw new Error("No file uploaded");

    const svg = await file.text();

    if (!svg.includes("<svg")) throw new Error("Not an SVG");
    if (!svg.includes("rect")) throw new Error("No bars found");
    if (!svg.includes("height")) throw new Error("Bar heights missing");

    return true;
  };

  const question = html`
    <p><strong>Case Study: Misleading Dashboard</strong></p>
    <p>
      A bar chart SVG is incorrectly rendered.
      Upload a corrected SVG where bar heights correctly reflect the data.
    </p>
    <input class="form-control" id="${id}" type="file" accept=".svg" />
  `;

  return { id, title, weight, question, answer };
}
