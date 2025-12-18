import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Python Network Analysis: Betweenness Centrality";

  const answer = "N8";

  const question = html`
    <div class="mb-3">
      <p>
        In a collaboration graph of actors, nodes represent actors and 
        edges denote shared movies. You used NetworkX in Python and ran:
      </p>
      <pre>
import networkx as nx
G = nx.read_edgelist("film_edges.csv")
centrality = nx.betweenness_centrality(G)
max(centrality, key=centrality.get)
      </pre>
      <p>
        Which actor node (e.g., <em>N8</em>) has the 
        <strong>highest betweenness centrality</strong>?
      </p>
      <label for="${id}" class="form-label">Node:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
