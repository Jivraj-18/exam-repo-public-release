import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rag-chunk-separator";
  const title = "RAG Document Chunking Separator";

  const answer = "===SPLIT===";

  const question = html`
    <div class="mb-3">
      <p>
        In the RAG (Retrieval Augmented Generation) tutorial using the TypeScript book,
        Markdown files are split into chunks using the <code>mdsplit4gpt</code> tool.
        A custom separator string is used to mark the boundaries between chunks.
      </p>
      <p>
        What is the exact separator string used in the command 
        <code>mdsplit4gpt "$f" --model gpt-4o --limit 4096 --separator "???"</code>?
      </p>
      <label for="${id}" class="form-label">Separator string:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="Enter exact separator (case-sensitive)" 
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

