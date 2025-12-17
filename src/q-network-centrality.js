import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Betweenness Centrality Meaning";

  const answer = "betweenness_centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In NetworkX, which function measures how often a node lies on the
        <strong>shortest paths between other nodes</strong>,
        indicating its role as a bridge?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
