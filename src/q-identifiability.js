import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-identifiability";
  const title = "Identifiability in Analysis";

  const answer = "Cannot be uniquely determined";

  const question = html`
    <div class="mb-3">
      <p>
        Two different parameter combinations explain the observed data equally well,
        producing identical outputs under all test conditions.
      </p>
      <p>
        What is the core analytical limitation here?
      </p>
      <label for="${id}" class="form-label">Limitation:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
