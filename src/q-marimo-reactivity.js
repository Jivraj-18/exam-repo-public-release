import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-marimo-reactivity";

  const question = html`
    <h4>Marimo Notebooks</h4>
    <p>
      What happens in Marimo when a cell variable changes?
    </p>
    <ol>
      <li>A. Nothing updates automatically</li>
      <li>B. Only the current cell reruns</li>
      <li>C. All dependent cells update reactively</li>
      <li>D. Kernel restarts</li>
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
