import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q_find_outlier";
  const title = "Embedding Outlier Detection";

  const answer = "def find_outlier"; // Anchor for grader

  const question = html`
    <div class="mb-3">
      <p><b>Embedding Outlier Detection</b></p>
      <p>Write a Python function <code>find_outlier(embeddings)</code> that:</p>
      <ul>
        <li>Computes cosine similarities between each item</li>
        <li>Finds average similarity for each</li>
        <li>Returns the text with the lowest similarity (outlier)</li>
      </ul>

      <label for=${id} class="form-label">Enter Python code:</label>
      <textarea class="form-control" id=${id} name=${id} rows="16"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
