import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality";
  const title = "Network Centrality Metric";

  const answer = "Betweenness centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In the "FilmCollab: Actor Collaboration Network" task, which specific network metric 
        must be calculated to identify the actor who bridges multiple communities (indicating 
        the shortest paths often pass through them)?
      </p>
      <label for="${id}" class="form-label">Metric:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}