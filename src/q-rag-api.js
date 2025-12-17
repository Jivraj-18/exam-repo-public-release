import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q_rag_api";
  const title = "RAG API Endpoint";

  const answer = "/lookup"; // Minimal required string

  const question = html`
    <div class="mb-3">
      <p><b>RAG API Endpoint</b></p>

      <p>
        Provide ONLY the URL of your FastAPI <code>/lookup</code> endpoint that
        performs:
      </p>

      <ul>
        <li>GET /lookup</li>
        <li>Embeds query text</li>
        <li>Compares to in-memory vectors</li>
        <li>Returns top 2 matches</li>
        <li>CORS enabled</li>
      </ul>

      <label for=${id} class="form-label">Endpoint URL:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
