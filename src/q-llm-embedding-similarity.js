import { html } from "lit-html";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-llm-embedding-similarity";
  const title = "LLM: Embedding Similarity";

  const sentences = [
    "The cat sat on the mat",
    "A feline rested on the rug",
    "Quantum mechanics is difficult",
  ];

  const answer = (v) => {
    if (!v.includes("1") && !v.includes("2"))
      throw new Error("Closest pair incorrect.");
    return true;
  };

  const question = html`
    <h2>${title}</h2>
    <p>Using cosine similarity on embeddings, which two sentences are most similar?</p>
    <ol>
      <li>${sentences[0]}</li>
      <li>${sentences[1]}</li>
      <li>${sentences[2]}</li>
    </ol>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
