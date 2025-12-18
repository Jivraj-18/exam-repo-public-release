import { html } from "lit";

export default async function question({ weight = 1 } = {}) {
  return {
    id: "q-llm-pipeline",
    type: "code",
    weight,
    question: html`
      <h1>Bash Pipelines with LLM</h1>
      <p>
        Write a single-line bash pipeline using Simon Willison's <code>llm</code> tool that:
        <ol>
          <li>Finds all <code>.log</code> files in the current directory (recursively).</li>
          <li>Reads their content.</li>
          <li>Pipes the content to an LLM with the prompt "Summarize errors".</li>
        </ol>
      </p>
    `,
    answer: `find . -name "*.log" -exec cat {} + | llm "Summarize errors"`,
  };
}