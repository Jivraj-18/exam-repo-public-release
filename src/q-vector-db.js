import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vector-db";
  const title = "Vector Database Similarity Search";
  const answer = "cosine";
  const question = html`
    <div class="mb-3">
      <p>
        You're building a semantic search engine for research papers. Which distance metric
        is most commonly used in vector databases like Pinecone or Weaviate to measure
        similarity between embedding vectors?
      </p>
      <label for="${id}" class="form-label">Distance Metric:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="e.g., euclidean, manhattan, cosine" 
      />
      <small class="form-text text-muted">
        Hint: This metric normalizes vectors and works well for high-dimensional spaces.
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}


