import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-rag-hallucination";
    const title = "RAG – Hallucination Control";

    const answer = "retrieved context";

    const question = html`
    <div class="mb-3">
      <p>
        In a Retrieval Augmented Generation (RAG) pipeline,
        the LLM is instructed to answer <em>only</em> using supplied notes.
      </p>
      <p>
        What component primarily prevents hallucinations
        by constraining the model’s knowledge source?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
