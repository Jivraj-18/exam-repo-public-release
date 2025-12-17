import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-prompt-pattern";
  const title = "Advanced Prompt Engineering";
  const answer = "chain-of-thought";
  const question = html`
    <div class="mb-3">
      <p>
        When prompting an LLM to solve complex mathematical or logical problems,
        which technique asks the model to "think step by step" to improve reasoning accuracy?
      </p>
      <label for="${id}" class="form-label">Prompting Technique (use hyphens):</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="e.g., few-shot, zero-shot, ..." 
      />
      <small class="form-text text-muted">
        This technique encourages the model to show intermediate reasoning steps.
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}