import { html } from "lit-html";

export default async function({ user, weight = 1 }) {
  const id = "q-llm-summary";
  const title = "LLM Summary Validation";

  const answer = (input) =>
    input.split("\n").length >= 3 && input.toLowerCase().includes("insight");

  const question = html`
    <p>Paste an LLM-generated summary with at least 3 insights.</p>
    <textarea class="form-control" id="${id}"></textarea>
  `;

  return { id, title, weight, question, answer };
}
