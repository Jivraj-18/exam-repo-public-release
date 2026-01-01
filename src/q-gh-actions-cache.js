// File: src/q-gh-actions-cache.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-actions-cache";
  const title = "GitHub Action with Dependency Caching";

  const answer = "cache-23c7b67";

  const question = html`
    <div class="mb-3">
      <p>
        In your GitHub Actions workflow, you used <code>actions/cache@v4</code> and primed the cache
        with a key named <code>cache-23c7b67</code>. What is the exact cache key value?
      </p>
      <label for="${id}" class="form-label">Cache key:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
