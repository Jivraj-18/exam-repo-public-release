export default function ({ user, weight = 1 }) {
  return {
    id: "embedding_cosine_similarity",
    weight,
    question: `
Two text embeddings are L2-normalized.

Which operation directly gives their cosine similarity?

A) Euclidean distance  
B) Dot product  
C) Cross product  
D) Manhattan distance

Answer with A, B, C, or D.
    `,
    answer: "B",
  };
}
