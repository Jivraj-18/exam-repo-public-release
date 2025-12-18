import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-data-pipeline";
  const title = "Build CLI Data Processing Pipeline";

  const answer = (input) => {
    const cmd = input.trim();

    if (!cmd.includes("jq")) throw new Error("jq not used");
    if (!cmd.includes("wc -l")) throw new Error("wc -l not used");
    if (!/score\s*>=\s*100/.test(cmd)) throw new Error("Score filter missing");
    if (!/\.title/.test(cmd)) throw new Error("Title extraction missing");
    if (!cmd.includes("|")) throw new Error("Pipeline missing");

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>DataOps - Automated ETL Pipelines</h3>
      <p>
        You are working on a command-line data processing workflow using Unix
        pipelines.
      </p>
      <p>
        You are given a JSON file <code>stories.json</code> containing an array
        of Hacker News story objects with fields such as
        <code>id</code>, <code>title</code>, and <code>score</code>.
      </p>
      <p>Write a <strong>single command-line pipeline</strong> that:</p>
      <ol>
        <li>Filters stories with <code>score &gt;= 100</code></li>
        <li>Extracts only the <code>title</code> field</li>
        <li>Counts how many titles match</li>
      </ol>
      <p>
        The command must use <code>jq</code> for JSON parsing and
        <code>wc -l</code> for counting.
      </p>
      <label for="${id}" class="form-label">
        Complete command:
      </label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="3"
        placeholder="cat stories.json | jq ... | wc -l"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
