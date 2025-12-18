import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-most-similar";
  const title = "Most Similar Feedback Pair";

  const answer = `import numpy as np

def most_similar(embeddings: dict[str, list[float]]) -> tuple[str, str]:
    phrases = list(embeddings.keys())
    best_pair = (None, None)
    best_score = -1.0
    for i in range(len(phrases)):
      for j in range(i + 1, len(phrases)):
        a = np.array(embeddings[phrases[i]])
        b = np.array(embeddings[phrases[j]])
        sim = float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))
        if sim > best_score:
          best_score = sim
          best_pair = (phrases[i], phrases[j])
    return best_pair
`;

  const question = html`
    <div class="mb-3">
      <p>
        ReviewRadar aggregates short customer comments and converts each into an
        embedding vector using a sentence transformer. A sample Python snippet
        looks like:
      </p>
      <pre><code>embeddings = {
  "Delivery was very fast.": [...],
  "Packaging could be better.": [...],
  "Excellent customer support.": [...],
  "Product quality is outstanding.": [...],
  "Shipping took too long.": [...]
}</code></pre>
      <p>
        Write a function <code>most_similar(embeddings)</code> that:
      </p>
      <ul>
        <li>Takes a dict mapping phrases (strings) to embedding vectors (lists of floats).</li>
        <li>Computes the cosine similarity between every <strong>distinct pair</strong> of phrases using NumPy.</li>
        <li>Returns a tuple <code>(phrase1, phrase2)</code> for the pair with the highest similarity.</li>
      </ul>
      <p>
        Assume <code>numpy</code> is already imported as <code>np</code>. Only write the function definition and its body.
      </p>
      <label for="${id}" class="form-label">Python function:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
