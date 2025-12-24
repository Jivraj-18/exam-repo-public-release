// Module 4 (LLMs - RAG) + Module 6 (Data Prep): Hybrid search with BM25 + vector similarity
// Weight: 5.0 marks
// Tests: Hybrid search algorithms, rank fusion, embedding dimensions, query rewriting

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate query rewriting challenge
  const queries = [
    { original: 'python data analysis', expanded: ['python', 'pandas', 'numpy', 'data', 'analysis', 'dataframe'] },
    { original: 'machine learning models', expanded: ['machine', 'learning', 'ml', 'model', 'sklearn', 'tensorflow'] },
    { original: 'web scraping tools', expanded: ['web', 'scraping', 'beautifulsoup', 'selenium', 'playwright', 'scraper'] }
  ];
  const query = queries[Math.floor(rng() * queries.length)];
  
  // Alpha parameter for rank fusion
  const alpha = 0.3 + (rng() * 0.4); // 0.3-0.7
  const k = 60; // BM25 parameter

  return {
    id: 'rag-hybrid-search',
    title: 'RAG with Hybrid Search (BM25 + Vector)',
    weight,
    question: html`
      <p>Implement hybrid search combining BM25 lexical search with vector semantic search.</p>
      
      <h3>The Problem with Pure Vector Search</h3>
      <p>Vector embeddings alone miss exact keyword matches. Hybrid search combines:</p>
      <ul>
        <li><strong>BM25</strong>: Lexical matching (keyword frequency with IDF weighting)</li>
        <li><strong>Vector similarity</strong>: Semantic meaning (cosine distance in embedding space)</li>
      </ul>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Query Rewriting with LLM (1.5 marks)</h4>
      <p>Use an LLM to expand the query <code>"${query.original}"</code>:</p>
      <pre><code>from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{
        "role": "system",
        "content": "Expand search queries with synonyms and related terms. Return JSON array of terms."
    }, {
        "role": "user", 
        "content": "${query.original}"
    }],
    response_format={ "type": "json_object" }
)

expanded_terms = json.loads(response.choices[0].message.content)['terms']</code></pre>
      
      <h4>Part B: BM25 Scoring (2.0 marks)</h4>
      <p>Implement BM25 with k=${k}:</p>
      <pre><code>from rank_bm25 import BM25Okapi

# Tokenize documents
corpus = [doc.lower().split() for doc in documents]
bm25 = BM25Okapi(corpus, k1=${k})

# Score using expanded query
bm25_scores = bm25.get_scores(expanded_terms)</code></pre>
      
      <h4>Part C: Reciprocal Rank Fusion (1.5 marks)</h4>
      <p>Combine BM25 and vector scores using RRF:</p>
      <pre><code>def reciprocal_rank_fusion(bm25_ranks, vector_ranks, k=60):
    # RRF formula: score = sum(1 / (k + rank))
    rrf_scores = {}
    
    for doc_id in set(bm25_ranks.keys()) | set(vector_ranks.keys()):
        bm25_rank = bm25_ranks.get(doc_id, float('inf'))
        vector_rank = vector_ranks.get(doc_id, float('inf'))
        
        rrf_scores[doc_id] = (
            1 / (k + bm25_rank) + 
            1 / (k + vector_rank)
        )
    
    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)</code></pre>
      
      <h3>Critical Edge Case</h3>
      <p>When a document appears in only ONE ranking:</p>
      <ul>
        <li>If in BM25 but not vector: <code>vector_rank = len(documents) + 1</code></li>
        <li>If in vector but not BM25: <code>bm25_rank = len(documents) + 1</code></li>
        <li>This prevents unfair penalization of single-method matches</li>
      </ul>
      
      <h3>Answer Format</h3>
      <p>Given:</p>
      <ul>
        <li>Document appears at rank 3 in BM25</li>
        <li>Same document at rank 7 in vector search</li>
        <li>k = ${k}</li>
      </ul>
      <p>Calculate the <strong>RRF score</strong> for this document:</p>
      <p><code>score = 1/(${k}+3) + 1/(${k}+7)</code></p>
      <p>Answer with the score <strong>rounded to 4 decimal places</strong>.</p>
      
      <h3>Hidden Complexity</h3>
      <ul>
        <li><strong>Query expansion</strong>: LLM may add irrelevant terms, need filtering</li>
        <li><strong>BM25 tuning</strong>: k1 and b parameters affect term frequency saturation</li>
        <li><strong>Rank vs Score</strong>: RRF uses ranks (1st, 2nd, 3rd), not raw scores</li>
        <li><strong>Missing documents</strong>: Handle docs that appear in only one ranking</li>
        <li><strong>Normalization</strong>: Must normalize before fusion or weights will be off</li>
      </ul>
      
      <details>
        <summary>Full Hybrid Search Example</summary>
        <pre><code>from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
import numpy as np

# Setup
model = SentenceTransformer('BAAI/bge-base-en-v1.5')
documents = ["doc 1", "doc 2", "doc 3"]

# BM25 lexical search
corpus_tokens = [doc.lower().split() for doc in documents]
bm25 = BM25Okapi(corpus_tokens)
bm25_scores = bm25.get_scores(query.split())
bm25_ranks = {i: rank for rank, i in enumerate(np.argsort(bm25_scores)[::-1])}

# Vector semantic search  
doc_embeddings = model.encode(documents)
query_embedding = model.encode(query)
similarities = np.dot(doc_embeddings, query_embedding)
vector_ranks = {i: rank for rank, i in enumerate(np.argsort(similarities)[::-1])}

# Reciprocal Rank Fusion
k = 60
rrf_scores = {}
for i in range(len(documents)):
    rrf_scores[i] = (
        1 / (k + bm25_ranks.get(i, len(documents))) +
        1 / (k + vector_ranks.get(i, len(documents)))
    )

# Sort by RRF score
final_ranking = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
print(final_ranking)</code></pre>
      </details>
      
      <h3>Why This Matters</h3>
      <p>Production RAG systems use hybrid search because:</p>
      <ul>
        <li>Pure vector search misses exact terminology (e.g., "GPT-4" vs "language model")</li>
        <li>Pure BM25 misses semantic similarity (e.g., "car" vs "automobile")</li>
        <li>RRF is more robust than weighted averaging (no score normalization needed)</li>
        <li>Query expansion with LLMs improves recall significantly</li>
      </ul>
    `,
    answer: async (answer) => {
      // Calculate RRF score: 1/(60+3) + 1/(60+7) = 1/63 + 1/67
      const score = (1 / (k + 3)) + (1 / (k + 7));
      const roundedScore = parseFloat(score.toFixed(4));
      const numAnswer = parseFloat(parseFloat(answer).toFixed(4));
      return Math.abs(numAnswer - roundedScore) < 0.0001;
    }
  };
}
