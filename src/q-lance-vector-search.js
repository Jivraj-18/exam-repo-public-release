import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

function embed(text, seed) {
  const rng = seedrandom(seed);
  // Tiny deterministic pseudo-embedding per text seed
  const vec = Array.from({ length: 8 }, () => rng());
  for (const ch of text) vec[(ch.charCodeAt(0) + text.length) % vec.length] += (ch.charCodeAt(0) % 7) / 100;
  return vec;
}

function dot(a, b) {
  return a.reduce((s, x, i) => s + x * b[i], 0);
}

export default async function ({ user, weight = 1 }) {
  const id = "q-lance-vector-search";
  const title = "Semantic Search: Top Doc ID";

  const baseSeed = `${user.email}#${id}`;
  const docs = [
    { id: "d1", text: "Rust systems programming guide" },
    { id: "d2", text: "Go microservices and concurrency" },
    { id: "d3", text: "Python data analysis notebook" },
    { id: "d4", text: "Vector databases with LanceDB" },
    { id: "d5", text: "Cloudflare Workers and KV" },
  ];
  const rng = seedrandom(baseSeed);
  const query = ["rust", "vector search", "cloud", "analysis"][Math.floor(rng() * 4)];

  const qvec = embed(query, `${baseSeed}|query|${query}`);
  const scored = docs.map((d) => ({ id: d.id, score: dot(embed(d.text, `${baseSeed}|doc|${d.id}`), qvec) }));
  const best = scored.sort((a, b) => b.score - a.score)[0].id;

  const answer = (input) => {
    const value = (input || "").trim();
    if (!value) throw new Error("Enter a document id like d3");
    if (value !== best) throw new Error("Incorrect id");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You chunked Markdown docs, embedded them, and stored in LanceDB.
        For the query <code>${query}</code>, which document ID ranks <strong>top-1</strong> by dot-product similarity using the toy embedding below?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(docs, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Top document id (e.g., d2):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
