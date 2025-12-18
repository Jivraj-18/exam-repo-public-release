import { html } from "lit";

export default async function question({ weight = 1 } = {}) {
  return {
    id: "q-fastapi-subprocess",
    type: "code",
    weight,
    question: html`
      <h1>FastAPI Agent Wrapper</h1>
      <p>
        You are building a FastAPI route that delegates tasks to the <code>claude</code> CLI.
      </p>
      <p>
        <strong>Task:</strong> Write the Python <code>subprocess.run</code> command (just the function call) 
        that executes: <code>claude -p "Refactor code"</code>. 
        Pass the Python variable <code>code_input</code> to the subprocess via stdin and capture the output.
      </p>
    `,
    answer: `subprocess.run(
    ["claude", "-p", "Refactor code"],
    input=code_input,
    text=True,
    capture_output=True
)`,
  };
}