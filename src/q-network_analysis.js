import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Python: Betweenness Centrality";

  const answer = "betweenness_centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In NetworkX, which function identifies nodes that
        <strong>bridge multiple communities</strong>
        by measuring how often they lie on shortest paths?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
