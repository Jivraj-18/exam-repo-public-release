import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-cli";
  const title = "LLM CLI Embeddings";

  const answer = "--store";

  const question = html`
    <div class="mb-3">
      <p>
        You are using the <code>llm</code> CLI to generate embeddings for a RAG system. 
        You run the command:
      </p>
      <pre><code>llm embed-multi my-collection chunks.json --model 3-small</code></pre>
      <p>
        However, the embeddings are only printed to the console and not saved to the 
        local database. Which flag must you add to the command to save the embeddings?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="--flag" />
    </div>
  `;

  return { id, title, weight, question, answer };
}