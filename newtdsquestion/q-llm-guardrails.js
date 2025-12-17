export default function ({ user, weight }) {
  return {
    id: "rag_freshness_consistency_production",
    weight,

    question: `
A company deploys an internal LLM assistant using Retrieval-Augmented Generation (RAG).
Documents are versioned and frequently updated (e.g., policy_v1, policy_v2).

During an audit, it is observed that:
- The vector database contains embeddings for both old and new versions
- Newer documents are successfully embedded and indexed
- The assistant still occasionally answers using outdated information

The system must:
- Always prefer the latest approved document
- Remain robust to partial re-indexing failures
- Avoid relying on prompt-only heuristics

Which design change MOST robustly guarantees correctness under these constraints?

A. Periodically delete old embeddings during re-indexing  
B. Attach document version metadata and enforce version-aware filtering at retrieval time  
C. Lower the LLM temperature and increase top-k retrieval  
D. Cache only the most recent LLM responses  

    `,

    answer: "B",
  };
}
