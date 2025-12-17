// File: q-network-betweenness-centrality.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-betweenness-centrality";
  const title = "Network Betweenness Centrality";
  const answer = "N6";

  const question = html`
    <div class="mb-3">
      <p>
        Using NetworkX and <code>nx.betweenness_centrality()</code>, which node
        has the <strong>highest betweenness centrality</strong>?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
