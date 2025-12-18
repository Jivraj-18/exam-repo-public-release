import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-revealjs-concepts";

  const question = html`
    <h4>RevealJS: Slide Behavior</h4>
    <p>
      In RevealJS, which feature allows slide content (like bullet points)
      to appear gradually during a presentation?
    </p>
    <ol>
      <li>A. Themes</li>
      <li>B. Plugins</li>
      <li>C. Fragments</li>
      <li>D. Markdown</li>
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
