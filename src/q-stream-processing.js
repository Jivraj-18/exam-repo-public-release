import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-cli-stream";
  const title = "JSON: Streaming Large Files (CLI)";

  const answer = "jq";

  const question = html`
    <div class="mb-3">
      <p>
        You need to filter records from a multi-gigabyte
        <code>.jsonl</code> file containing one JSON object per line.
        The file cannot be loaded fully into memory.
      </p>
      <p>
        Which <strong>command-line tool</strong> allows you to stream,
        filter, and transform JSON records line by line?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

