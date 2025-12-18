import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llms-txt";
  const title = "Inference Standard File";

  const answer = "llms.txt";

  const question = html`
    <div class="mb-3">
      <p>
        What is the standard filename used to provide curated information to help 
        LLMs use a website or API at inference time?
      </p>
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}