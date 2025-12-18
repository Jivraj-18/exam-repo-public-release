import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Betweenness Centrality";

  const answer = "betweenness centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In network analysis, which metric measures how often a node lies on
        the shortest paths between other nodes?
      </p>
      <label for="${id}" class="form-label">Metric name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
