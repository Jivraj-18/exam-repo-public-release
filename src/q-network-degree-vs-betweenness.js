import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-degree-vs-betweenness";
  const title = "Degree vs Betweenness Centrality";
  const answer = "Betweenness captures bridging importance";

  const question = html`
    <div class="mb-3">
      <p>
        An actor appears in fewer movies but connects
        <strong>multiple disconnected groups</strong>.
        Why is <strong>betweenness centrality</strong> more informative
        than <strong>degree centrality</strong> here?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}