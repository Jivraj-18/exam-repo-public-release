import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-seaborn-savefig";
  const title = "Saving Seaborn Visualizations";

  const answer = "plt.savefig('chart.png', dpi=64)";

  const question = html`
    <div class="mb-3">
      <p>
        After creating a Seaborn plot using Matplotlib,
        which Python command saves the visualization as
        <code>chart.png</code> with a DPI of <strong>64</strong>?
      </p>
      <label for="${id}" class="form-label">Python command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
