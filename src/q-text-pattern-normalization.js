import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-replace";
  const title = "Text Pattern Normalization";
  const answer = "s/[^a-z0-9]/-/g";
  
  const question = html`
    <div class="mb-3">
      <p>
        You need to normalize tags by replacing all <strong>non-alphanumeric characters</strong> 
        with hyphens using sed or similar tools.
        <br>Example: "API Error!" → "API-Error-"
      </p>
      <label for="${id}" class="form-label">Regex Pattern (sed syntax):</label>
      <input class="form-control" id="${id}" name="${id}" 
             placeholder="s/pattern/replacement/flags" />
      <small class="form-text text-muted">Use sed substitution syntax: s/pattern/replacement/flags</small>
    </div>
  `;
  
  return { id, title, weight, question, answer };
}