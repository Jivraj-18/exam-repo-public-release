import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Network Analysis: Betweenness Insight";

  const answer = "N4";

  const question = html`
    <div class="mb-3">
      <p>
        A collaboration network was analyzed using NetworkX.
        Nodes represent employees, and edges represent shared projects.
      </p>
      <p>
        Betweenness centrality scores were:
      </p>
      <pre>
N1: 0.02
N2: 0.11
N3: 0.09
N4: 0.31
N5: 0.07
      </pre>
      <p>
        Which node acts as the strongest bridge between teams?
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
