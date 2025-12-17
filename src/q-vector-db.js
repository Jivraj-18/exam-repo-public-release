import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vector-db";
  const title = "Vector Database Usage";

  const answer = "approximate nearest neighbor";

  const question = html`
    <div class="mb-3">
      <p>
        Vector databases such as FAISS, Milvus, and Chroma are optimized
        for fast similarity search using which general algorithmic idea?
      </p>
      <label for="${id}" class="form-label">Algorithm concept:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
