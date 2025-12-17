import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-log-analysis";
  const title = "Shell-Based HTTP Error Analysis";

  const question = html`
    <div class="mb-3">
      <p>
        You are given an HTTP access log with entries in the format:
      </p>

      <pre><code>2024-09-18T11:42:01Z GET /api/orders status=500 bytes=312 rt=842ms cluster=ap-south-1</code></pre>

      <p>
        Using standard shell tools (<code>grep</code>, <code>awk</code>, <code>cut</code>, etc.),
        write a <strong>single shell pipeline</strong> that:
      </p>

      <ol>
        <li>Filters requests made to paths starting with <code>/api/orders</code></li>
        <li>Includes only <strong>5xx</strong> status codes</li>
        <li>Restricts logs to the <code>ap-south-1</code> cluster</li>
        <li>Counts how many such failed requests occurred</li>
      </ol>

      <p>
        <strong>Answer format:</strong>  
        Enter only the shell command pipeline.
      </p>

      <label for="${id}" class="form-label">Shell command:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="grep ... | awk ..."
      />
    </div>
  `;

  const answer = null;

  return { id, title, weight, question, answer };
}
