import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2.0 }) {
  const id = "q-rag-document-search";
  const title = "RAG: Hybrid Search & Re-ranking Architecture";

  const random = seedrandom(`${user.email}#${id}`);
  
  const docCount = 50000;
  
  const answer = (input) => {
    const text = input.toLowerCase().trim();
    
    const requiredConcepts = [
      { term: "hybrid", error: "Must explain 'hybrid search' (combining keyword + vector)" },
      { term: "sparse", error: "Should mention sparse vectors (BM25/Splade) for keyword search" },
      { term: "dense", error: "Should mention dense vectors (embeddings) for semantic search" },
      { term: "rerank", error: "Must include a 're-ranking' step (Cross-Encoder/Cohere)" },
      { term: "reciprocal rank fusion", error: "Should mention fusion technique like RRF (Reciprocal Rank Fusion)" },
    ];
    
    let score = 0;
    for (const { term, error } of requiredConcepts) {
      if (text.includes(term) || (term === "reciprocal rank fusion" && text.includes("rrf"))) {
        score++;
      }
    }
    
    if (score < 4) {
      throw new Error("Your architecture is missing key advanced RAG components (Hybrid Search, Re-ranking, Fusion).");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: High-Precision Legal Document Search</h2>
      <p>
        <strong>LegalTech AI</strong> is building a search engine for <strong>${docCount.toLocaleString()}</strong> complex legal contracts. 
        Standard vector search (dense embeddings) is failing because it misses specific legal terms (e.g., "force majeure", "indemnification cap") 
        that are crucial, even if the semantic meaning is close.
      </p>
      
      <h3>Problem</h3>
      <ul>
        <li><strong>Dense Retrieval issues:</strong> Misses exact keyword matches for rare legal terms.</li>
        <li><strong>Keyword Search issues:</strong> Misses conceptually similar clauses phrased differently.</li>
        <li><strong>Accuracy requirement:</strong> The system must retrieve the top 5 most relevant clauses with >95% precision.</li>
      </ul>
      
      <h3>Task</h3>
      <p>
        Design an <strong>Advanced RAG Architecture</strong> that solves these problems. Describe a <strong>Hybrid Search with Re-ranking</strong> pipeline.
      </p>
      <p>Your answer must explain:</p>
      <ol>
        <li><strong>Hybrid Retrieval:</strong> How you will combine Keyword Search (Sparse Vectors) and Semantic Search (Dense Vectors).</li>
        <li><strong>Fusion Strategy:</strong> How you will merge results from both streams (e.g., Reciprocal Rank Fusion).</li>
        <li><strong>Re-ranking:</strong> The addition of a Cross-Encoder or Re-ranking model step to refine the top candidates before sending to the LLM.</li>
      </ol>
      
      <label for="${id}" class="form-label">
        Describe the Hybrid RAG Architecture (minimum 200 words):
      </label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="12"
        placeholder="To achieve high precision, we will implement a hybrid search pipeline..."
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
