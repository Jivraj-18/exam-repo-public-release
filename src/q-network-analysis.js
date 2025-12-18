import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Betweenness Centrality Meaning";

  const answer = "node that lies on many shortest paths";

  const question = html`
    <div class="mb-3">
      <p>
        In network analysis, betweenness centrality helps identify influential nodes.
      </p>
      <p>
        A node with high betweenness centrality is best described as a:
      </p>
      <label for="${id}" class="form-label">Description:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
