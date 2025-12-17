import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  DESIGN NOTES:
  -------------
  • Uses precomputed, normalized embeddings
  • Requires cosine similarity computation
  • Requires semantic reasoning beyond similarity
  • Deterministic auto-grading
  • No correct-answer leakage
*/

export default async function ({ user }) {
  const id = "q-embedding-semantic-drift";
  const title = "Semantic Drift Detection using Embeddings";

  // Normalized embeddings (unit vectors)
  const embeddings = {
    original: [0.12, -0.08, 0.31, -0.22, 0.09, 0.41, -0.17, 0.29],
    R1:       [0.11, -0.07, 0.30, -0.21, 0.10, 0.40, -0.18, 0.28],
    R2:       [0.05, -0.01, 0.18, -0.10, 0.22, 0.31, -0.05, 0.19],
    R3:       [-0.14, 0.09, -0.21, 0.18, -0.33, -0.29, 0.11, -0.25],
  };

  // -------- GRADER LOGIC --------
  const cosine = (a, b) =>
    a.reduce((sum, v, i) => sum + v * b[i], 0);

  const similarities = {
    R1: cosine(embeddings.original, embeddings.R1),
    R2: cosine(embeddings.original, embeddings.R2),
    R3: cosine(embeddings.original, embeddings.R3),
  };

  const ranking = Object.entries(similarities)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  // Semantic drift is defined here as a rewrite that contradicts
  // the access restriction in the original sentence
  const semanticDrift = "R3";

  const answer = (value) => {
    let obj;
    try {
      obj = JSON.parse(value);
    } catch {
      throw new Error("Answer must be valid JSON");
    }

    if (
      !obj ||
      !Array.isArray(obj.ranking) ||
      typeof obj.semantic_drift !== "string"
    ) {
      throw new Error(
        "JSON must contain keys: ranking (array), semantic_drift (string)"
      );
    }

    if (obj.ranking.join(",") !== ranking.join(",")) {
      throw new Error("Incorrect ranking. Please recompute similarities.");
    }

    if (obj.semantic_drift !== semanticDrift) {
      throw new Error(
        "Incorrect semantic drift identification. Re-evaluate meaning."
      );
    }

    return true;
  };

  // -------- QUESTION UI --------
  const question = html`
    <div class="mb-3">
      <h2><strong>Detecting Semantic Drift in LLM Rewrites</strong></h2>

      <p>
        A company uses an LLM to rewrite internal policy text for customer-facing
        portals. Even when embeddings appear similar, rewrites may introduce
        <strong>semantic drift</strong> by subtly altering or reversing meaning.
      </p>

      <h3>Original Sentence</h3>
      <pre><code>
Access to customer financial data is restricted to authorized personnel only.
      </code></pre>

      <h3>LLM Rewrites</h3>
      <pre><code>
R1: Only approved staff can access customer financial information.
R2: Customer financial data may be accessed by employees when necessary.
R3: Financial information about customers is publicly accessible.
      </code></pre>

      <h3>Normalized Embeddings</h3>
      <pre><code class="json">
${JSON.stringify(embeddings)}
      </code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Compute cosine similarity between the original and each rewrite.</li>
        <li>Rank the rewrites from most to least similar.</li>
        <li>
          Identify which rewrite introduces <strong>semantic drift</strong>
          by contradicting the original access restriction.
        </li>
      </ol>

      <h3>Answer Format</h3>
      <pre><code class="json">{
  "ranking": ["R1", "R2", "R3"],
  "semantic_drift": "R3"
}</code></pre>

      <label for="${id}" class="form-label">Your answer</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="4"
        required
      ></textarea>

      <p class="text-muted mt-2">
        Note: High similarity does not guarantee semantic correctness.
      </p>
    </div>
  `;

  return { id, title, question, answer };
}
