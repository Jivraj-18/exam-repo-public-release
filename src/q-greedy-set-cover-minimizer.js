import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-greedy-set-cover";
  const title = "Greedy Set Cover Minimization";
  const answer = "3";

  const question = html`
    <div class="mb-3">
      <p>
        Resource allocation problems often use greedy approximations
        to find near-optimal solutions efficiently.
      </p>

      <p>
        Universe:
      </p>

      <pre>{A, B, C, D, E, F, G}</pre>

      <p>
        Available sets:
      </p>

      <pre>
S1 = {A, B, C}
S2 = {C, D, E}
S3 = {E, F, G}
S4 = {A, F}
      </pre>

      <p>
        Using the <strong>greedy set cover algorithm</strong>
        (always pick the set covering the most uncovered elements),
        determine the number of sets selected.
      </p>

      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
