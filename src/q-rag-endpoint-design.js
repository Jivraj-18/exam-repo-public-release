export default function ({ user, weight = 1 }) {
  return {
    id: "rag_api_endpoint",
    weight,
    question: `
You are building a Retrieval-Augmented Generation (RAG) API.

Which endpoint design is MOST appropriate to accept
documents and a query?

A) GET /search?q=...
B) POST /search with JSON body
C) PUT /search
D) DELETE /search

Answer with A, B, C, or D.
    `,
    answer: "B",
  };
}
