import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-mean";
  const title = "Group Mean Calculation";

  const random = seedrandom(`${user.email}#${id}`);

  const values = Array.from({ length: 10 }, () =>
    Math.floor(random() * 50) + 1,
  );

  const answer =
    values.reduce((a, b) => a + b, 0) / values.length;

  const question = html`
    <div class="mb-3">
      <p>
        You load the following numeric column into a Pandas DataFrame:
      </p>

      <pre><code>${values.join(", ")}</code></pre>

      <p>
        If you compute the mean of this column, what is the result?
        (Enter the exact decimal value.)
      </p>

      <label for="${id}" class="form-label">Mean</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
