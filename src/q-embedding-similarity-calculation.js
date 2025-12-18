import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embed-math";
  const title = "Calculating Cosine Similarity";

  // Dot product of [0.6, 0.8] and [1.0, 0.0] = 0.6*1 + 0.8*0 = 0.6
  const answer = "0.6";

  const question = html`
    <div class="mb-3">
      <p>
        You are building a semantic search engine. You have two text inputs that have been 
        converted into <strong>normalized</strong> embedding vectors (magnitude = 1).
      </p>
      <p>
        <strong>Vector A:</strong> <code>[0.6, 0.8]</code><br>
        <strong>Vector B:</strong> <code>[1.0, 0.0]</code>
      </p>
      <p>
        Calculate the <strong>cosine similarity</strong> (dot product) of these two vectors.
      </p>
      <label for="${id}" class="form-label">Similarity Score:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="0.0" />
    </div>
  `;

  return { id, title, weight, question, answer };
}