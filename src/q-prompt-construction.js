import { html } from "lit-html";

export default async function({ user, weight = 1 }) {
  const id = "q-ai-prompt";
  const title = "AI Coding Prompt Validation";

  const requiredPhrases = ["read json", "calculate average", "return result"];

  const answer = (input) =>
    requiredPhrases.every((p) => input.toLowerCase().includes(p));

  const question = html`
    <p>Write a prompt instructing an AI to:</p>
    <ol>
      <li>Read a JSON file</li>
      <li>Calculate average of a numeric field</li>
      <li>Return the result</li>
    </ol>
    <textarea class="form-control" id="${id}"></textarea>
  `;

  return { id, title, weight, question, answer };
}
