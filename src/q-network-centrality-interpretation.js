import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-centrality-interpretation";
  const title = "Network Centrality Interpretation";
  const answer = "Acts as a bridge between communities";

  const question = html`
    <div class="mb-3">
      <p>
        An actor has the highest
        <strong>betweenness centrality</strong> in a collaboration network.
        What does this imply about their position in the network?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
