import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-log-pipeline";
  const title = "CLI Log Analysis Pipeline";

  const answer =
    "awk '$2>=500 {sum+=$3; count++} END {if(count>0) print sum/count}' access.log";

  const question = html`
    <div class="mb-3">
      <p>
        You have a file <code>access.log</code> where each line is:
        <br />
        <code>&lt;timestamp&gt; &lt;status_code&gt; &lt;latency_ms&gt;</code>
      </p>
      <p>
        Write a <strong>single bash pipeline</strong> that computes the
        <strong>average latency</strong> of requests with status code
        <strong>500 or above</strong>.
      </p>
      <label for="${id}" class="form-label">Bash pipeline:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
