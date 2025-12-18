import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Python: Betweenness Centrality in Collaboration Network";

  const answer = "N4";

  const question = html`
    <div class="mb-3">
      <p>
        A collaboration network is constructed where nodes represent
        contributors and edges represent joint projects.
      </p>
      <p>
        Using NetworkX, <code>betweenness_centrality()</code> is computed
        to identify the node that most frequently lies on shortest paths
        between others.
      </p>
      <p>
        <strong>Which node acts as the primary bridge between communities?</strong>
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
