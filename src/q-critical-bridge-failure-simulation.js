import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-bridge";
  const title = "Network Bridge Failure Impact";

  const answer = "N12";

  const question = html`
    <div class="mb-3">
      <p>
        In a collaboration network, nodes represent teams and edges represent
        shared projects. You simulate the removal of each node and measure the
        <strong>increase in connected components</strong>.
      </p>
      <p>
        Which node causes the <strong>largest fragmentation</strong> when removed,
        indicating it is the most critical structural bridge?
      </p>
      <label for="${id}" class="form-label">Node ID:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
