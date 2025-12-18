import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-bottleneck";
  const title = "Corporate Communication Bottlenecks";
  const answer = "Betweenness Centrality";
  const question = html`
    <div class="mb-3">
      <p>In a company's internal email network graph, the HR department wants to identify employees who act as critical "bridges" between the engineering team and the sales team. Which network metric identifies individuals who lie on the most shortest paths between other nodes and could become communication bottlenecks?</p>
      <label for="${id}" class="form-label">Network Metric:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. Degree" />
    </div>
  `;

  return { id, title, weight, question, answer };
}