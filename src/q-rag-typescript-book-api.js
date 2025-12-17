export default function ({ user, weight = 1.0 }) {
  return {
    id: "rag-typescript-book-api",
    title: "RAG with TypeScript Book: API Endpoint",
    weight,

    description: `
TechDocs Inc. is building a Retrieval Augmented Generation (RAG) system to answer
developer questions using their internal documentation corpus.

For this exercise, you will implement a **proof-of-concept RAG API** using the
TypeScript Book as the knowledge source.

Your system should retrieve relevant excerpts and return answers grounded in
the documentation.

Requirements:
• Implement an HTTP GET endpoint: /search?q=question_text
• The endpoint must return a JSON response containing:
  {
    "answer": "string containing the relevant documentation excerpt",
    "sources": "optional references to source documents"
  }
• The response MUST include the **exact answer text** for each query
• Enable CORS to allow requests from any origin
• You may implement retrieval using:
  - CLI-based RAG (llm embed / similar), or
  - A hybrid RAG system (e.g., TypeSense)
• The API may run locally

Example questions that will be tested:
• "What does the author affectionately call the => syntax?"
• "Which operator converts any value into an explicit boolean?"

Paste ONLY the URL of your running RAG API endpoint
(e.g., http://localhost:8000/search).
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "URL of a running RAG API endpoint"
    },

    grading: {
      type: "rubric",
      criteria: [
        "Endpoint accepts GET requests with a query parameter",
        "Response is valid JSON with an answer field",
        "Returned answer is grounded in the TypeScript Book",
        "Exact expected answers are present in the response",
        "CORS is enabled for cross-origin requests"
      ]
    }
  };
}
