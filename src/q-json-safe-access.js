import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function qJsonSafeAccess() {
  return {
    id: "q-json-safe-access",
    title: "JSON: safe key access",
    weight: 1,
    question: html`
      <div class="mb-3">
        <p>
          You are processing JSON objects in Python. Some objects may not contain
          the key <code>price</code>.
        </p>
        <p>
          Write a <strong>single Python expression</strong> to safely read
          <code>price</code> with default value <code>0</code>.
        </p>
        <label class="form-label">Code:</label>
        <input class="form-control" name="q-json-safe-access" />
      </div>
    `,
    answer: "obj.get('price', 0)",
  };
}
