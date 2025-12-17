import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-agent-trace-forensics";
  const title = "AI Agent Trace Forensics";

  const question = html`
    <div class="mb-3">
      <p>
        You ran a CLI coding agent (Claude Code, Codex CLI, Copilot CLI, Gemini CLI, etc.)
        with debug / verbose logging enabled.
      </p>

      <p><strong>Task:</strong></p>
      <ol>
        <li>Ask the agent to refactor Python code to replace recursion with iteration</li>
        <li>Enable debug / log mode</li>
        <li>From the logs, extract:</li>
        <ul>
          <li>The <strong>first shell command</strong></li>
          <li>The <strong>last shell command</strong></li>
        </ul>
      </ol>

      <p><strong>Answer format:</strong></p>
      <pre>&lt;first_command&gt; || &lt;last_command&gt;</pre>

      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  const answer = (input) => {
    if (!input.includes("||")) {
      throw new Error("Answer must use '||' to separate commands");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}

