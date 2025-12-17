import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Python: Betweenness Centrality Leader";

  const answer = "N4";

  const question = html`
    <div class="mb-3">
      <p>
        An undirected graph represents collaborations between users.
        Each edge indicates a shared project.
      </p>
      <p>
        Using NetworkX, compute
        <strong>betweenness centrality</strong> for all nodes.
      </p>
      <p>
        Which node acts as the <strong>key bridge</strong> between communities?
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
