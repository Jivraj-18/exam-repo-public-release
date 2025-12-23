import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-seaborn-violin-insight";
  const title = "Seaborn Violin Plot Insight";

  const answer = "density";

  const question = html`
    <div class="mb-3">
      <p>
        A Seaborn <code>violinplot</code> combines a boxplot with a kernel
        __________ estimation to show the shape of data.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
