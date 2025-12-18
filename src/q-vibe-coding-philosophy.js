import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vibe-coding";
  const title = "Vibe Coding Philosophy";

  const answer = "vibe-coding";

  const question = html`
    <div class="mb-3">
      <p>
        According to the text, what is the name of the development philosophy that prioritizes 
        <strong>"shipping scrappy first drafts fast"</strong> and "fully giving in to the vibes" 
        by accepting AI edits without hand-editing diffs?
      </p>
      <label for="${id}" class="form-label">Term:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. pair-programming" />
    </div>
  `;

  return { id, title, weight, question, answer };
}