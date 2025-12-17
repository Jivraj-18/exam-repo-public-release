import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Network Analysis: Betweenness Centrality Insight";

  const answer = "connects multiple communities";

  const question = html`
    <div class="mb-3">
      <p>
        In a collaboration network, a node with high 
        <strong>betweenness centrality</strong> typically:
      </p>
      <p>
        (Describe its role in the network)
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
