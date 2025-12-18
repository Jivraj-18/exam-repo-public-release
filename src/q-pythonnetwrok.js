import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Python Network Analysis: Central Node";

  const answer = "N7";

  const question = html`
    <div class="mb-3">
      <p>
        You constructed an undirected graph in NetworkX using an edge list
        and computed <strong>betweenness centrality</strong>.
      </p>
      <p>
        Which node acts as the <strong>main bridge</strong> between communities
        (i.e., has the highest betweenness centrality)?
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
