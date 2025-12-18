import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function ({ user, weight = 1 }) {
  const id = "q-network-degree";
  const title = "Network Centrality Metrics";

  const answer = "Degree Centrality";

  const question = html`
    <div class="mb-3">
      <p>
        In network analysis, what metric defines the total number of 
        <strong>direct connections</strong> (edges) a specific node has?
      </p>
      <label for="${id}" class="form-label">Metric Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}