import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-embedding-similarity-metric";
  const title = "Embedding Similarity Metric";

  const answer = "cosine similarity";

  const question = html`
    <div class="mb-3">
      <p>
        In many GA4 use cases (semantic search, clustering, RAG),
        text embeddings are compared to measure how similar two pieces
        of text are.
      </p>

      <p>
        Assume each embedding vector is <strong>L2-normalized</strong>
        (its magnitude is 1). In this scenario:
      </p>

      <ul>
        <li>The similarity score lies between -1 and 1</li>
        <li>The score is computed using the dot product</li>
        <li>The metric measures semantic closeness, not lexical overlap</li>
      </ul>

      <p>
        What is the name of this similarity metric?
      </p>

      <p class="text-muted">
        Answer using the standard mathematical term.
      </p>

      <label for="${id}" class="form-label">Similarity metric:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="Enter metric name"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
