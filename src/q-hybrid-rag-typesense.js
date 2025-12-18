import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 3 }) {
  const id = "q-hybrid-rag-typesense";
  const title = "Hybrid RAG: TypeSense Semantic + Keyword Search";

  const random = seedrandom(`${user.email}#${id}`);

  const searchQueries = [
    "advanced machine learning algorithms",
    "cloud cost optimization strategies",
    "real-time fraud detection systems",
    "scalable microservices patterns",
    "data privacy compliance frameworks",
  ];

  const selectedQuery = pick(searchQueries, random);

  const question = html`
    <div class="mb-3">
      <h2>KnowledgeVault: Enterprise Hybrid RAG System</h2>
      <p>
        <strong>KnowledgeVault</strong> is an enterprise AI-powered knowledge management platform serving Fortune 500
        companies. Their clients need to search through millions of internal documents, technical manuals, and research
        papers using both exact keyword matching AND semantic understanding.
      </p>

      <h3>The Limitation of Pure Semantic Search</h3>
      <p>
        Vector databases excel at semantic search but struggle with:
        <ul>
          <li>Exact product codes, serial numbers, or identifiers</li>
          <li>Specific technical terms that must match precisely</li>
          <li>Queries where keyword precision matters (e.g., "Python 3.11" vs "Python programming")</li>
        </ul>
      </p>

      <h3>The Power of Hybrid Search</h3>
      <p>
        <strong>Hybrid search</strong> combines:
        <ul>
          <li><strong>Keyword search:</strong> Fast, exact matching with BM25 ranking</li>
          <li><strong>Semantic search:</strong> Understanding intent and concepts via embeddings</li>
          <li><strong>Fusion:</strong> Merges results using weighted scoring or reciprocal rank fusion (RRF)</li>
        </ul>
        This approach gives the best of both worlds - precision AND recall.
      </p>

      <h3>Why TypeSense?</h3>
      <p>
        <strong>TypeSense</strong> is an open-source search engine that natively supports:
        <ul>
          <li>Automatic embedding generation (no separate vector database needed)</li>
          <li>Hybrid search with configurable weights</li>
          <li>Multi-field search (title, content, metadata)</li>
          <li>Real-time indexing and sub-50ms query latency</li>
          <li>Easy Docker deployment</li>
        </ul>
      </p>

      <h3>Your Mission</h3>
      <p>
        Build a production-ready hybrid RAG system using <strong>TypeSense</strong> and expose it via FastAPI:
      </p>

      <ol>
        <li>
          Deploy TypeSense using Docker:
          <pre><code>docker run -d -p 8108:8108 \\
  -v\$(pwd)/typesense-data:/data \\
  typesense/typesense:27.1 \\
  --data-dir /data \\
  --api-key=your-api-key \\
  --enable-cors</code></pre>
        </li>
        <li>
          Create a collection with auto-embedding:
          <ul>
            <li>Use TypeSense's built-in embedding model (e.g., <code>ts/all-MiniLM-L12-v2</code>)</li>
            <li>Fields: <code>title</code>, <code>content</code>, <code>category</code></li>
            <li>Enable hybrid search</li>
          </ul>
        </li>
        <li>
          Index at least <strong>15 documents</strong> covering technical topics (can be scraped, AI-generated, or from
          documentation sites)
        </li>
        <li>
          Create FastAPI endpoint <code>GET /hybrid-search?q=...&k=N</code> that:
          <ul>
            <li>Performs hybrid search (semantic + keyword)</li>
            <li>Returns top K results with scores</li>
            <li>Returns JSON with document titles, excerpts, and hybrid scores</li>
          </ul>
        </li>
        <li>Enable CORS for cross-origin requests</li>
      </ol>

      <h3>Testing Query</h3>
      <p>
        For grading, your endpoint will be tested with:
        <code class="d-block my-2">"${selectedQuery}"</code>
        requesting the top <strong>5</strong> most relevant documents using hybrid search.
      </p>

      <h3>Implementation Example</h3>
      <pre><code># Install: pip install typesense fastapi uvicorn
import typesense
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

# Connect to TypeSense
client = typesense.Client({
  'nodes': [{'host': 'localhost', 'port': '8108', 'protocol': 'http'}],
  'api_key': 'your-api-key',
  'connection_timeout_seconds': 2
})

# Create collection with auto-embedding
schema = {
  'name': 'documents',
  'fields': [
    {'name': 'title', 'type': 'string'},
    {'name': 'content', 'type': 'string'},
    {'name': 'category', 'type': 'string', 'facet': True},
    {'name': 'embedding', 'type': 'float[]',
     'embed': {
       'from': ['title', 'content'],
       'model_config': {'model_name': 'ts/all-MiniLM-L12-v2'}
     }
    }
  ]
}
client.collections.create(schema)

# Index documents
docs = [
  {'title': 'ML Pipeline', 'content': 'Building scalable...', 'category': 'AI'},
  # ... more documents
]
for doc in docs:
  client.collections['documents'].documents.create(doc)

# Hybrid search endpoint
@app.get("/hybrid-search")
def hybrid_search(q: str, k: int = 5):
    search_params = {
        'q': q,
        'query_by': 'title,content,embedding',
        'per_page': k,
        'include_fields': 'title,content',
        'exclude_fields': 'embedding',
        'vector_query': 'embedding:([], alpha:0.5)'  # 50% semantic, 50% keyword
    }
    results = client.collections['documents'].documents.search(search_params)

    return {
        'query': q,
        'results': [{
            'title': hit['document']['title'],
            'content': hit['document']['content'][:200],
            'score': hit['hybrid_search_info']['rank_fusion_score']
        } for hit in results['hits']],
        'email': '${user.email}'
    }</code></pre>

      <h3>Key Configuration</h3>
      <ul>
        <li>
          <code>alpha</code> parameter controls hybrid balance:
          <ul>
            <li><code>alpha: 0.0</code> = 100% keyword search</li>
            <li><code>alpha: 0.5</code> = 50% keyword, 50% semantic (recommended)</li>
            <li><code>alpha: 1.0</code> = 100% semantic search</li>
          </ul>
        </li>
        <li>Use reciprocal rank fusion (RRF) for score merging</li>
      </ul>

      <h3>Response Format</h3>
      <pre><code>{
  "query": "search query",
  "results": [
    {"title": "Doc Title", "content": "excerpt...", "score": 0.95},
    ...
  ],
  "email": "${user.email}"
}</code></pre>

      <label for="${id}" class="form-label">
        Enter the full URL of your <code>/hybrid-search</code> endpoint
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://your-api.com/hybrid-search"
        required
      />
      <p class="text-muted">
        We'll test with <code>GET /hybrid-search?q=${encodeURIComponent(selectedQuery)}&k=5</code>. Response must be
        JSON with email=${user.email}, 5 results with hybrid scores, and documents indexed in TypeSense with auto-embedding.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const testUrl = new URL(url);
    testUrl.searchParams.set("q", selectedQuery);
    testUrl.searchParams.set("k", "5");

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
    if (data.results.length < 5) {
      throw new Error(`Expected at least 5 results, got ${data.results.length}. Ensure you have indexed enough documents.`);
    }

    // Verify each result has required fields
    for (let i = 0; i < 5; i++) {
      const result = data.results[i];
      if (!result.title || typeof result.title !== "string") {
        throw new Error(`Result ${i + 1} must have 'title' field`);
      }
      if (!result.content || typeof result.content !== "string") {
        throw new Error(`Result ${i + 1} must have 'content' field`);
      }
      if (result.content.length < 20) {
        throw new Error(`Result ${i + 1} content is too short (minimum 20 characters)`);
      }
      if (typeof result.score === "undefined") {
        throw new Error(`Result ${i + 1} must have 'score' field from hybrid search`);
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
