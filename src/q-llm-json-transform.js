import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q_llm_json_transform";
  const title = "LLM JSON Transformation";

  const answer = `"model": "gpt-4o-mini"`; // Minimal correctness-check anchor

  const question = html`
    <div class="mb-3">
      <p><b>LLM JSON Transformation</b></p>
      <p>Write ONLY the JSON body for a Chat Completions request with:</p>
      <ul>
        <li><code>model: "gpt-4o-mini"</code></li>
        <li>System: “Convert the following CSV into JSON”</li>
        <li>User message includes:</li>
      </ul>
      <pre>
id,name,score
1,Alice,92
2,Bob,76
3,Carla,88
      </pre
      >
      <p>
        Use <code>response_format</code> with a strict JSON schema containing:
      </p>
      <ul>
        <li><code>rows</code> array of objects</li>
        <li>Fields: <code>id (number), name (string), score (number)</code></li>
        <li><code>additionalProperties: false</code></li>
      </ul>

      <label for=${id} class="form-label">Enter JSON body:</label>
      <textarea class="form-control" id=${id} name=${id} rows="16"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
