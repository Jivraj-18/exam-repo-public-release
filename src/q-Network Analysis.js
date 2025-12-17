import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-betweenness";
  const title = "Python Network Analysis: Betweenness Centrality";

  const answer = "N4";

  const question = html`
    <div class="mb-3">
      <p>
        You construct an undirected graph using NetworkX where
        nodes represent users and edges represent collaborations.
      </p>
      <p>
        After running <code>nx.betweenness_centrality()</code>,
        one node clearly bridges two dense clusters.
      </p>
      <p>
        Which node has the <strong>highest betweenness centrality</strong>?
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}