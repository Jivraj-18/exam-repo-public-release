import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-embedding-duplicate-detection";
  const title = "Embedding Duplicate Detection: Semantic Similarity";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate document clusters - some are semantic duplicates (same meaning, different words)
  const documentClusters = [
    {
      topic: "product_review",
      original: "The smartphone has an excellent camera and the battery lasts all day.",
      paraphrases: [
        "This phone's camera is outstanding and the battery life is impressive.",
        "Great camera quality on this mobile device, plus it doesn't need charging until night.",
        "The camera on this phone is top-notch and battery performance is exceptional.",
      ],
      unrelated: [
        "The restaurant serves delicious Italian food with great ambiance.",
        "I bought a new laptop for my office work yesterday.",
        "The weather forecast predicts rain for the entire week.",
      ],
    },
    {
      topic: "news_headline",
      original: "Tech giant announces plans to lay off 10,000 employees amid economic downturn.",
      paraphrases: [
        "Major technology company to cut 10,000 jobs due to economic challenges.",
        "Economic slowdown forces tech corporation to eliminate 10,000 positions.",
        "Technology firm reveals workforce reduction of 10,000 amid financial difficulties.",
      ],
      unrelated: [
        "New study reveals coffee may have health benefits.",
        "Local football team wins championship after exciting final match.",
        "City council approves new public transportation expansion plan.",
      ],
    },
    {
      topic: "scientific_abstract",
      original: "Machine learning models can predict patient outcomes with high accuracy using electronic health records.",
      paraphrases: [
        "AI algorithms achieve high precision in forecasting patient results from digital medical data.",
        "Using electronic medical records, ML systems accurately predict clinical outcomes.",
        "Patient outcome prediction reaches high accuracy through machine learning on health data.",
      ],
      unrelated: [
        "The museum will host a new exhibition on ancient Egyptian artifacts.",
        "Stock prices fluctuated wildly during the trading session.",
        "New cooking show becomes the most-watched program this season.",
      ],
    },
    {
      topic: "customer_feedback",
      original: "The delivery was late and the package arrived damaged.",
      paraphrases: [
        "My order came after the expected date and was broken when it arrived.",
        "Package delivery was delayed and the item was damaged upon arrival.",
        "The shipment was not on time and the product was harmed during transit.",
      ],
      unrelated: [
        "The hiking trail offers beautiful views of the mountain range.",
        "New smartphone features improved facial recognition technology.",
        "The concert tickets sold out within minutes of release.",
      ],
    },
  ];

  const cluster = pick(documentClusters, random);
  
  // Select 2 paraphrases (duplicates) and 3 unrelated documents
  const numParaphrases = 2;
  const shuffledParaphrases = [...cluster.paraphrases].sort(() => random() - 0.5);
  const selectedParaphrases = shuffledParaphrases.slice(0, numParaphrases);
  
  const numUnrelated = 3;
  const shuffledUnrelated = [...cluster.unrelated].sort(() => random() - 0.5);
  const selectedUnrelated = shuffledUnrelated.slice(0, numUnrelated);

  // Combine and shuffle all documents
  const allDocuments = [
    { text: cluster.original, isDuplicate: true, label: "A" },
    ...selectedParaphrases.map((text, i) => ({ text, isDuplicate: true, label: String.fromCharCode(66 + i) })),
    ...selectedUnrelated.map((text, i) => ({ text, isDuplicate: false, label: String.fromCharCode(66 + numParaphrases + i) })),
  ];

  // Shuffle documents
  const shuffledDocs = [...allDocuments].sort(() => random() - 0.5);
  
  // Reassign labels after shuffling
  shuffledDocs.forEach((doc, i) => {
    doc.label = String.fromCharCode(65 + i);
  });

  // Find the correct answer (labels of duplicate documents)
  const duplicateLabels = shuffledDocs
    .filter(doc => doc.isDuplicate)
    .map(doc => doc.label)
    .sort()
    .join("");

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the labels of the duplicate documents.");

    // Normalize the response
    const cleaned = response.toString().toUpperCase().replace(/[^A-Z]/g, "");
    const sortedResponse = cleaned.split("").sort().join("");

    if (sortedResponse.length < 2) {
      throw new Error("You should identify at least 2 documents as duplicates (same semantic meaning).");
    }

    if (sortedResponse.length > 4) {
      throw new Error("Too many documents selected. Focus on finding semantically SIMILAR content.");
    }

    if (sortedResponse !== duplicateLabels) {
      throw new Error(
        `Incorrect duplicate set. Remember: duplicates have the SAME MEANING even if words are different. ` +
        `Use embeddings to find documents with high cosine similarity (> 0.8).`
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>NewsGuard AI: Duplicate Content Detection</h2>
      <p>
        <strong>NewsGuard AI</strong> is building a news aggregation platform that needs to identify 
        duplicate articles - stories that cover the same topic but are written differently by various 
        news outlets. Simple keyword matching doesn't work because journalists use different words 
        to describe the same events.
      </p>

      <p>
        The solution is to use <strong>text embeddings</strong> - converting text into numerical vectors 
        that capture semantic meaning. Documents with similar meanings will have similar embeddings, 
        even if they use completely different words!
      </p>

      <h3>Your Task</h3>
      <p>
        Below are ${shuffledDocs.length} text snippets. Some of them are <strong>semantic duplicates</strong> 
        (same meaning, different wording). Use embeddings to identify which documents are duplicates.
      </p>

      <h3>Documents to Analyze</h3>
      <div class="list-group mb-3">
        ${shuffledDocs.map(
          (doc) => html`
            <div class="list-group-item">
              <strong>Document ${doc.label}:</strong> "${doc.text}"
            </div>
          `
        )}
      </div>

      <h3>Steps</h3>
      <ol>
        <li>
          Generate embeddings for each document using OpenAI's API:
          <pre class="bg-dark text-light p-2 rounded"><code>POST https://api.openai.com/v1/embeddings
{
  "model": "text-embedding-3-small",
  "input": ["Document A text", "Document B text", ...]
}</code></pre>
        </li>
        <li>
          Calculate <strong>cosine similarity</strong> between all pairs of embeddings:
          <pre class="bg-dark text-light p-2 rounded"><code>import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))</code></pre>
        </li>
        <li>
          Find document pairs with similarity <strong>&gt; 0.8</strong> - these are likely duplicates
        </li>
        <li>
          Identify the cluster of semantically similar documents
        </li>
      </ol>

      <h3>Key Insight</h3>
      <div class="alert alert-info">
        <strong>💡 The "Aha Moment":</strong> Embeddings capture <em>meaning</em>, not just words!
        <ul>
          <li>"The movie was great" and "I loved the film" → High similarity (~0.9)</li>
          <li>"The movie was great" and "The weather is nice" → Low similarity (~0.3)</li>
        </ul>
        This is why semantic search is so powerful - it understands context and synonyms!
      </div>

      <label for="${id}" class="form-label">
        Which documents are semantic duplicates? Enter their labels (e.g., "A, B, C" or "ABC"):
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="text" 
        placeholder="e.g., A, B, C or ABC" 
        required 
      />
      <p class="text-muted">
        Enter the labels of ALL documents that have the same semantic meaning.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
SOLUTION APPROACH:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx", "numpy"]
# ///

import httpx
import numpy as np
import os

# Get your API key from environment or set it directly
API_KEY = os.environ.get("OPENAI_API_KEY", "your-api-key-here")

documents = [
    "Document A text here...",
    "Document B text here...",
    # ... etc
]

# Step 1: Generate embeddings
response = httpx.post(
    "https://api.openai.com/v1/embeddings",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "text-embedding-3-small",
        "input": documents
    }
)

data = response.json()
embeddings = [item["embedding"] for item in data["data"]]

# Step 2: Calculate cosine similarity for all pairs
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

n = len(documents)
labels = [chr(65 + i) for i in range(n)]  # A, B, C, D, E, F

print("Similarity Matrix:")
print("-" * 50)

duplicates = []
for i in range(n):
    for j in range(i + 1, n):
        sim = cosine_similarity(embeddings[i], embeddings[j])
        print(f"{labels[i]} vs {labels[j]}: {sim:.4f}")
        if sim > 0.8:
            duplicates.append((labels[i], labels[j], sim))

print("-" * 50)
print("\nDuplicates (similarity > 0.8):")
for a, b, sim in duplicates:
    print(f"  {a} ↔ {b}: {sim:.4f}")

# Step 3: Find the cluster of duplicates
# If A-B and B-C are duplicates, then A, B, C are all in the same cluster
all_duplicate_labels = set()
for a, b, _ in duplicates:
    all_duplicate_labels.add(a)
    all_duplicate_labels.add(b)

print(f"\nAnswer: {''.join(sorted(all_duplicate_labels))}")


KEY LEARNINGS:

1. EMBEDDINGS CAPTURE MEANING
   - "Great camera" and "Outstanding camera" → Similar embeddings
   - "Great camera" and "Delicious food" → Different embeddings

2. COSINE SIMILARITY MEASURES SEMANTIC CLOSENESS
   - 1.0 = Identical meaning
   - 0.8+ = Very similar (likely duplicates)
   - 0.5-0.8 = Somewhat related
   - < 0.5 = Different topics

3. PRACTICAL APPLICATIONS
   - Content deduplication
   - Plagiarism detection
   - News clustering
   - Product matching
   - Search relevance ranking

4. WHY THIS BEATS KEYWORD MATCHING
   - Keywords: "phone camera great" vs "mobile device outstanding photo"
     → 0% word overlap, but same meaning!
   - Embeddings: Both sentences → similar vectors
*/

