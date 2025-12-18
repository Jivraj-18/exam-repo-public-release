export default {
  id: "rag_fastapi_endpoint",
  title: "RAG API Endpoint for Semantic Search",

  question: `
A company is building a Retrieval Augmented Generation (RAG) service using FastAPI.

The API must:
<ul>
  <li>Accept a GET request at <code>/search</code></li>
  <li>Receive the user query via a query parameter <code>q</code></li>
  <li>Return a JSON response containing an <code>answer</code> field</li>
  <li>Enable CORS for all origins</li>
</ul>

You do <b>NOT</b> need to implement the full RAG pipeline.

<strong>Task:</strong><br/>
Write the complete FastAPI endpoint URL that will be used to access this service locally.
`,

  answer: ({ input }) => {
    const text = input.trim()
    return (
      text === "http://127.0.0.1:8000/search" ||
      text === "http://localhost:8000/search"
    )
  }
}
