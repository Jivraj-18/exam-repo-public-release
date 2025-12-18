import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-matplotlib-scatter";
  const title = "Matplotlib Scatter Plot";

  const answer = "plt.scatter(x, y)";

  const question = html`
    <div class="mb-3">
      <p>
        In Matplotlib, which function creates a <strong>scatter plot</strong> of two
        variables <code>x</code> and <code>y</code>?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
