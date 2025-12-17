import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-embedding-similarity";
  const title = "Semantic Search System with Vector Embeddings";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate a corpus of documents
  const documents = [
    {
      id: "doc1",
      title: "Introduction to Machine Learning",
      content:
        "Machine learning is a subset of artificial intelligence that focuses on algorithms that learn from data. Common techniques include supervised learning, unsupervised learning, and reinforcement learning.",
    },
    {
      id: "doc2",
      title: "Deep Neural Networks",
      content:
        "Deep learning uses neural networks with multiple layers to process complex patterns. Convolutional neural networks excel at image processing, while recurrent networks handle sequential data like text and time series.",
    },
    {
      id: "doc3",
      title: "Data Visualization Techniques",
      content:
        "Effective data visualization transforms numbers into insights. Popular libraries include Matplotlib for static plots, Seaborn for statistical graphics, and Plotly for interactive visualizations.",
    },
    {
      id: "doc4",
      title: "Database Management Systems",
      content:
        "Databases store and retrieve data efficiently. SQL databases like PostgreSQL use structured schemas, while NoSQL databases like MongoDB offer flexible document storage for unstructured data.",
    },
    {
      id: "doc5",
      title: "Natural Language Processing",
      content:
        "NLP enables computers to understand human language. Key tasks include sentiment analysis, named entity recognition, machine translation, and text summarization using transformer models like BERT and GPT.",
    },
    {
      id: "doc6",
      title: "Web Scraping and APIs",
      content:
        "Web scraping extracts data from websites using tools like BeautifulSoup and Playwright. RESTful APIs provide structured access to data, with authentication via API keys or OAuth tokens.",
    },
    {
      id: "doc7",
      title: "Statistical Analysis Methods",
      content:
        "Statistics help identify patterns in data. Hypothesis testing validates assumptions, regression models predict outcomes, and correlation analysis reveals relationships between variables.",
    },
    {
      id: "doc8",
      title: "Cloud Computing Platforms",
      content:
        "Cloud services provide scalable infrastructure. AWS offers EC2 for compute, S3 for storage. Azure provides machine learning services, while Google Cloud excels at big data processing with BigQuery.",
    },
  ];

  const queries = [
    { text: "How do neural networks process images?", relevant: ["doc2", "doc1"] },
    { text: "What tools can I use to create charts and graphs?", relevant: ["doc3"] },
    { text: "How do I extract data from websites?", relevant: ["doc6"] },
    { text: "What is sentiment analysis in text processing?", relevant: ["doc5"] },
    { text: "How do SQL and NoSQL databases differ?", relevant: ["doc4"] },
    { text: "What statistical methods exist for prediction?", relevant: ["doc7"] },
  ];

  const selectedQuery = pick(queries, random);
  const topRelevantDoc = selectedQuery.relevant[0];

  // Create downloadable corpus
  const corpusLines = documents.map((doc) => JSON.stringify(doc));
  const corpusBlob = new Blob([corpusLines.join("\n")], { type: "application/jsonl" });

  const question = html`
    <div class="mb-3">
      <h2>Building a Semantic Search System with Embeddings</h2>
      <p>
        Semantic search goes beyond keyword matching to understand the <em>meaning</em> of queries. Your task is to
        build a complete semantic search system using embeddings and cosine similarity.
      </p>
      <p>
        Download the document corpus:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() =>
          download(corpusBlob, `${id}-corpus.jsonl`)}>
          ${id}-corpus.jsonl
        </button>
      </p>
      <h3>System Requirements</h3>
      <p>Build a semantic search system that:</p>
      <ol>
        <li>Loads all documents from the JSONL corpus</li>
        <li>Generates embeddings for each document's content using OpenAI's <code>text-embedding-3-small</code></li>
        <li>For the query <strong>"${selectedQuery.text}"</strong>, generates a query embedding</li>
        <li>Calculates cosine similarity between query and all documents</li>
        <li>Returns the <strong>document ID</strong> with the highest similarity score</li>
      </ol>
      <h3>Implementation Template</h3>
      <pre><code class="language-python"># /// script
# requires-python = ">=3.11"
# dependencies = ["httpx"]
# ///

import httpx
import json
import os
from typing import List, Dict

def embed(text: str) -> List[float]:
    """Generate embedding using OpenAI API"""
    response = httpx.post(
        "https://api.openai.com/v1/embeddings",
        headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
        json={"model": "text-embedding-3-small", "input": text},
        timeout=30
    )
    return response.json()["data"][0]["embedding"]

def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Calculate cosine similarity between two vectors"""
    dot_product = sum(x * y for x, y in zip(a, b))
    magnitude_a = sum(x * x for x in a) ** 0.5
    magnitude_b = sum(x * x for x in b) ** 0.5
    return dot_product / (magnitude_a * magnitude_b)

# Load documents
documents = []
with open("${id}-corpus.jsonl") as f:
    for line in f:
        documents.append(json.loads(line))

# Generate document embeddings
print("Generating embeddings for", len(documents), "documents...")
doc_embeddings = {}
for doc in documents:
    doc_embeddings[doc["id"]] = embed(doc["content"])

# Query
query = "${selectedQuery.text}"
query_emb = embed(query)

# Calculate similarities
similarities = {}
for doc_id, doc_emb in doc_embeddings.items():
    similarities[doc_id] = cosine_similarity(query_emb, doc_emb)

# Get top result
top_doc = max(similarities.items(), key=lambda x: x[1])
print(f"Top result: {top_doc[0]} (similarity: {top_doc[1]:.4f})")</code></pre>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Batch Processing:</strong> Embed multiple documents efficiently</li>
        <li><strong>Vector Similarity:</strong> Cosine similarity for semantic matching</li>
        <li><strong>Ranking:</strong> Sort results by relevance score</li>
        <li><strong>API Management:</strong> Handle rate limits and timeouts</li>
      </ul>
      <p class="text-muted">
        <strong>Tip:</strong> You can batch embed documents by passing multiple texts in a single API call:
        <code>{"input": [text1, text2, ...]}</code>
      </p>
      <label for="${id}" class="form-label">
        Which document ID is most relevant to the query: "${selectedQuery.text}"?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="doc1" required />
      <p class="text-muted">
        Enter the document ID (e.g., doc1, doc2, etc.) that has the highest cosine similarity to the query
      </p>
    </div>
  `;

  const answer = async (value) => {
    const docId = String(value || "").trim().toLowerCase();

    if (!docId) {
      throw new Error("Please enter a document ID");
    }

    if (!documents.find((d) => d.id === docId)) {
      throw new Error(`Invalid document ID. Must be one of: ${documents.map((d) => d.id).join(", ")}`);
    }

    if (docId !== topRelevantDoc) {
      throw new Error(
        `Document ${docId} is not the most relevant. Please verify your semantic search implementation. ` +
          `Ensure you're using text-embedding-3-small and calculating cosine similarity correctly for all documents.`,
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
