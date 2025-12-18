import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 2 }) {
  const id = "q-vector-semantic-search";
  const title = "Vector Database: Semantic Document Search";

  const random = seedrandom(`${user.email}#${id}`);

  const searchQueries = [
    "machine learning algorithms for predictive analytics",
    "cloud infrastructure optimization strategies",
    "customer retention analysis techniques",
    "real-time data processing pipelines",
    "security compliance automation tools",
    "scalable microservices architecture",
  ];

  const selectedQuery = pick(searchQueries, random);
  const topK = 3 + Math.floor(random() * 3); // 3-5

  const question = html`
    <div class="mb-3">
      <h2>DocuSearch AI: Enterprise Knowledge Base with Semantic Search</h2>
      <p>
        <strong>DocuSearch AI</strong> is a knowledge management platform that helps enterprises organize and search
        through vast document repositories using AI-powered semantic search. Unlike traditional keyword search, semantic
        search understands the meaning and context of queries, returning conceptually relevant results even when exact
        keywords don't match.
      </p>

      <h3>Business Problem</h3>
      <p>
        A Fortune 500 company has 50,000+ internal documents (technical specs, research papers, SOPs, policies) scattered
        across systems. Engineers waste hours searching for relevant information using basic keyword search. They need a
        semantic search system that understands concepts like "data pipeline optimization" and returns documents about
        "ETL performance tuning" or "stream processing efficiency."
      </p>

      <h3>Technical Solution: Vector Databases</h3>
      <p>
        Vector databases store documents as high-dimensional embeddings (numerical vectors) that capture semantic meaning.
        When users search, their query is converted to a vector and the database finds the most similar document vectors
        using cosine similarity or other distance metrics.
      </p>

      <h3>Your Mission</h3>
      <p>
        Build a semantic search system using <strong>ChromaDB</strong> (or LanceDB/DuckDB VSS) that:
      </p>
      <ol>
        <li>
          Creates a vector database with at least <strong>20 technical documents</strong> (can be synthetic or scraped
          from technical blogs, documentation sites, or AI-generated)
        </li>
        <li>
          Uses embeddings to represent documents (use <code>sentence-transformers</code> or OpenAI/Gemini embedding APIs)
        </li>
        <li>
          Implements a FastAPI endpoint <code>GET /search?q=...&k=N</code> that:
          <ul>
            <li>Accepts a semantic query</li>
            <li>Returns top K most similar documents</li>
            <li>Includes similarity scores</li>
            <li>Returns JSON with document titles and excerpts</li>
          </ul>
        </li>
        <li>Enables CORS for cross-origin requests</li>
      </ol>

      <h3>Testing Query</h3>
      <p>
        For grading, your endpoint will be tested with this query:
        <code class="d-block my-2">"${selectedQuery}"</code>
        requesting the top <strong>${topK}</strong> most relevant documents.
      </p>

      <h3>Implementation Guidance</h3>
      <pre><code># Install dependencies
pip install chromadb sentence-transformers fastapi uvicorn

# Example structure
import chromadb
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

# Initialize ChromaDB and embedding model
client = chromadb.Client()
collection = client.create_collection("documents")
model = SentenceTransformer('all-MiniLM-L6-v2')

# Add documents with embeddings
documents = ["doc1 text...", "doc2 text..."]
embeddings = model.encode(documents)
collection.add(embeddings=embeddings.tolist(),
               documents=documents,
               ids=[f"doc{i}" for i in range(len(documents))])

@app.get("/search")
def search(q: str, k: int = 5):
    query_embedding = model.encode([q])
    results = collection.query(query_embeddings=query_embedding.tolist(), n_results=k)
    return {
        "query": q,
        "results": [
            {"title": f"Document {i+1}",
             "text": results['documents'][0][i][:200],
             "score": results['distances'][0][i]}
            for i in range(len(results['documents'][0]))
        ],
        "email": "${user.email}"
    }</code></pre>

      <h3>Response Format</h3>
      <p>Your endpoint must return JSON in this format:</p>
      <pre><code>{
  "query": "the search query",
  "results": [
    {"title": "Document Title", "text": "excerpt...", "score": 0.85},
    ...
  ],
  "email": "${user.email}"
}</code></pre>

      <label for="${id}" class="form-label">
        Enter the full URL of your <code>/search</code> endpoint
      </label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://your-api.com/search" required />
      <p class="text-muted">
        We'll test with <code>GET /search?q=${encodeURIComponent(selectedQuery)}&k=${topK}</code>. Response must be
        JSON with email field matching ${user.email}, at least ${topK} results with similarity scores, and semantically
        relevant documents.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const testUrl = new URL(url);
    testUrl.searchParams.set("q", selectedQuery);
    testUrl.searchParams.set("k", String(topK));

    const resp = await fetch(testUrl.toString());
    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}. Expected 200 OK.`);

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) throw new Error("Response must be application/json");

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Response is not valid JSON");
    }

    if (!data || typeof data !== "object") throw new Error("Response must be a JSON object");
    if (data.email !== user.email) throw new Error(`Email must match ${user.email}`);
    if (data.query !== selectedQuery) throw new Error("Query echo does not match");
    if (!Array.isArray(data.results)) throw new Error("Response must contain results array");
    if (data.results.length < topK) {
      throw new Error(`Expected at least ${topK} results, got ${data.results.length}`);
    }

    // Verify each result has required fields
    for (let i = 0; i < Math.min(topK, data.results.length); i++) {
      const result = data.results[i];
      if (!result.text || typeof result.text !== "string") {
        throw new Error(`Result ${i + 1} must have 'text' field`);
      }
      if (result.text.length < 20) {
        throw new Error(`Result ${i + 1} text is too short (minimum 20 characters)`);
      }
      if (typeof result.score === "undefined") {
        throw new Error(`Result ${i + 1} must have 'score' field`);
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
