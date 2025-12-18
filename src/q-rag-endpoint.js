export default function ({ user, weight = 1 }) {
  return {
    id: "rag-endpoint",
    title: "RAG API Endpoint Identification",
    weight,
    prompt: `
You implemented a FastAPI RAG service with the route:

POST /search

What is the full local URL for this endpoint if the server runs on port 8000?
    `,
    answer: "http://127.0.0.1:8000/search",
  };
}
