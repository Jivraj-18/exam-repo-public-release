import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const hash = btoa(user.email).slice(0, 8);

  return {
    id: "q-22f3003115-groq-cli",
    weight,
    answer: async (link) => {
      link = link.trim();
      if (!link.startsWith("https://gist.github.com/")) {
        throw new Error("Please provide a valid GitHub Gist URL");
      }
      return true;
    },
    question: html`
      <h2>Groq API Log Analyzer</h2>
      <p>
        Build a CLI tool that analyzes API response times using the Groq Chat
        Completions API.
      </p>

      <h3>Task</h3>
      <p>Given this JSON log file containing API call records:</p>
      <pre><code>{
  "calls": [
    {"endpoint": "/search", "latency_ms": 120, "status": 200},
    {"endpoint": "/search", "latency_ms": 450, "status": 200},
    {"endpoint": "/data", "latency_ms": 89, "status": 200},
    {"endpoint": "/search", "latency_ms": 890, "status": 500}
  ]
}</code></pre>

      <h3>Requirements</h3>
      <ol>
        <li>
          Use the <strong>Groq API</strong> with model
          <code>llama-3.3-70b-versatile</code> to analyze this data
        </li>
        <li>
          Your prompt should ask: "Identify the slowest endpoint and calculate
          average latency for successful calls (status 200)"
        </li>
        <li>
          Parse the LLM response and extract:
          <ul>
            <li>Slowest endpoint name</li>
            <li>Average latency for status 200 calls</li>
          </ul>
        </li>
        <li>
          Create a <strong>public GitHub Gist</strong> with your
          Python/JavaScript code
        </li>
        <li>Include error handling for API rate limits</li>
      </ol>

      <h3>Your Answer</h3>
      <p>
        Submit the <strong>GitHub Gist URL</strong> containing your complete
        code with API key placeholder and usage instructions.
      </p>
      <p>Your code hash for verification: <code>${hash}</code></p>

      <input
        type="url"
        id="answer-q-22f3003115-groq-cli"
        placeholder="https://gist.github.com/..."
        style="width: 100%; padding: 8px;"
      />
    `,
  };
}
