import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-model-dimension";
  const title = "Text Embedding Dimensions";

  const answer = "1024";

  const question = html`
    <div class="mb-3">
      <p>
        You are using Jina AI's <code>jina-clip-v2</code> model to generate
        embeddings for both text and images. The model normalizes vectors
        using L2 normalization by default.
      </p>
      <p>
        What is the <strong>dimensionality</strong> (number of dimensions) 
        of the embedding vectors produced by this model?
      </p>
      <label for="${id}" class="form-label">Number of dimensions:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number"
        placeholder="Enter number" 
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

