import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vibe-data-crunching";
  const title = "Vibe Code — Data Crunching App";

  const answer = "Aggregating and transforming raw data";

  const question = html`
    <div class="mb-3">
      <p>
        What is the primary purpose of a data crunching app in Vibe Coding?
      </p>

      <label>
        <input type="radio" name="${id}" />
        Aggregating and transforming raw data
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Designing UI components
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Managing cloud infrastructure
      </label>
    </div>
  `;

  return { id, title, question, answer, weight };
}
