import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-nx-load";
  const title = "Load Edge List in NetworkX";

  const answer = "nx.read_edgelist";

  const question = html`
    <div class="mb-3">
      <p>
        In the NetworkX library (imported as <code>nx</code>), which function 
        is used to read a graph from a text file containing an <strong>edge list</strong>?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}