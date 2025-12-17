import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 5: Data Cleaning
export async function question5({ user, weight = 1 }) {
  const id = "q-encoding-issue";
  const title = "Character Encoding Problem";

  const answer = "UTF-8";

  const question = html`
    <div class="mb-3">
      <p>
        You're working with international customer data and notice that some names with
        special characters (like ñ, ü, é) are displaying as garbage symbols when you
        open a CSV file.
      </p>
      <p>
        What is the most commonly recommended character encoding for handling
        international text that is backwards compatible with ASCII?
      </p>
      <label for="${id}" class="form-label">Encoding:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., ASCII" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
