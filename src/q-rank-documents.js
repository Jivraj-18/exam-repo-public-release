import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-rank-documents";
  const title = "Search Ranking: TF-IDF + Recency fusion";

  const random = seedrandom(`${user.email}#${id}`);

  // Small corpus designed so the top doc is deterministic
  const now = Date.now();
  const docs = [
    { id: "doc-1", text: "deep learning transformer models and training", ts: now - 1000 * 60 * 60 * 24 * 10 }, // oldest
    { id: "doc-2", text: "transformer architecture and self attention mechanisms", ts: now - 1000 * 60 * 60 * 24 * 2 },
    { id: "doc-3", text: "deep learning training and optimization for transformers", ts: now - 1000 * 60 * 60 * 24 * 1 }, // newest
    { id: "doc-4", text: "attention mechanisms in neural networks", ts: now - 1000 * 60 * 60 * 24 * 5 },
  ];

  const query = "transformer training";
  const alpha = 0.6; // fusion weight for tfidf

  // compute simple TF-IDF + recency score
  const tokenize = (s) => s.toLowerCase().split(/\W+/).filter(Boolean);
  const N = docs.length;
  const df = {};
  docs.forEach((d) => {
    const set = new Set(tokenize(d.text));
    set.forEach((t) => (df[t] = (df[t] || 0) + 1));
  });

  const minTs = Math.min(...docs.map((d) => d.ts));
  const maxTs = Math.max(...docs.map((d) => d.ts));
  const recency = (ts) => ((ts - minTs) / (maxTs - minTs)) || 0;

  const idf = (t) => Math.log(1 + N / (df[t] || 1));

  const scoreFor = (d) => {
    const tokens = tokenize(d.text);
    const qtokens = tokenize(query);
    const tf = (t) => tokens.filter((x) => x === t).length / tokens.length;
    let tfidf = 0;
    qtokens.forEach((t) => { tfidf += tf(t) * idf(t); });
    const r = recency(d.ts);
    return alpha * tfidf + (1 - alpha) * r;
  };

  const scores = docs.map((d) => ({ id: d.id, score: scoreFor(d) }));
  scores.sort((a, b) => b.score - a.score);
  const topDoc = scores[0].id;

  const answer = async (value) => {
    if (!value || typeof value !== "string") throw new Error("Enter the id of the top-ranked document (e.g., doc-3)");
    if (value.trim() !== topDoc) throw new Error(`Top document should be ${topDoc}`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Rank documents by TF-IDF fused with recency</h2>
      <p>
        You have a small corpus and a query. Implement a ranking function where final score =
        <code>alpha * TFIDF(query,doc) + (1 - alpha) * recency_score</code>. Use the TF as term frequency normalized by doc length
        and IDF as <code>log(1 + N/df)</code>. Recency is linearly normalized between oldest and newest document.
      </p>
      <p><strong>Query:</strong> <code>${query}</code></p>
      <p><strong>alpha:</strong> <code>${alpha}</code></p>
      <label for="${id}" class="form-label">Which document id ranks highest?</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Notes: This small deterministic example is intended for implementing and testing the fusion strategy. */