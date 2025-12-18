import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-marp-structure";

  const question = html`
    <h4>Marp: Slide Separation</h4>
    <p>
      In a Marp presentation, what syntax is used to separate two slides?
    </p>
    <ol>
      <li>A. ###</li>
      <li>B. ---</li>
      <li>C. ***</li>
      <li>D. ===</li>
    </ol>
    <input class="form-control" id="${id}" />
  `;

  const answer = async (value) => {
    if (value.trim().toUpperCase() !== "B") {
      throw new Error("Incorrect");
    }
    return true;
  };

  return { id, question, weight, answer };
}
