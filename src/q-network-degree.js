import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-degree";
  const title = "Network Analysis: Connection Density";

  const answer = "degree centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In a collaboration network, if you want to find the actor who has worked with the <strong>highest number of unique individuals</strong>, 
        regardless of how central they are to the whole network, which centrality metric are you measuring?
      </p>
      <label for="${id}" class="form-label">Centrality Metric:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}