import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-pipeline-hard";
  const title = "CLI Pipeline with AI Tool";

  const answer = "git diff | llm";

  const question = html`
    <div class="mb-3">
      <p>
        You want to send the current Git diff of a repository to an LLM
        for summarization using Simon Willison’s CLI tool.
      </p>
      <p>
        Write the <strong>pipeline command prefix</strong> that correctly
        streams the diff into the LLM.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

