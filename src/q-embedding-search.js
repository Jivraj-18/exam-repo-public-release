export default async function ({ user, weight = 1 }) {
  return {
    id: "q-embedding-search-variant",
    title: "Semantic Document Search Using Embeddings",
    weight,

    prompt: `
You are given 7 documents and a user query:

Query:
"How do I cancel my subscription?"

Documents (index 0–6):
0. Password reset instructions
1. Business strategy overview
2. Subscription benefits and plans
3. Quantum computing research
4. API gateway architecture
5. Neural network advancements
6. 24/7 customer support availability

Task:
• Generate embeddings using text-embedding-3-small
• Compute cosine similarity
• Rank documents by similarity
• Return the top 2 document indices

Output format:
[docIndex1, docIndex2]
    `,

    outputSpec: "JSON array of two integers",

    help: [
      "Normalize embeddings before similarity",
      "Subscription & support docs are most relevant"
    ]
  };
}
