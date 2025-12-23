import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-22f3003115-api-orchestration",
    weight,
    answer: async (link) => {
      link = link.trim();
      if (!link.startsWith("https://gist.github.com/")) {
        throw new Error("Please provide a valid GitHub Gist URL");
      }
      return true;
    },
    question: html`
      <h2>Multi-API Data Fusion</h2>
      <p>Combine data from two public APIs to create a unified report.</p>

      <h3>Task</h3>
      <p>Build a script that:</p>

      <ol>
        <li>
          <strong>API 1 - GitHub:</strong> Fetch repository info for
          <code>sanand0/tools-in-data-science-public</code>
          <ul>
            <li>
              Endpoint:
              <code
                >https://api.github.com/repos/sanand0/tools-in-data-science-public</code
              >
            </li>
            <li>
              Extract: <code>stargazers_count</code>, <code>forks_count</code>,
              <code>open_issues_count</code>
            </li>
          </ul>
        </li>
        <li>
          <strong>API 2 - Hacker News:</strong> Search for latest post
          mentioning "data science tools"
          <ul>
            <li>
              Endpoint:
              <code
                >https://hn.algolia.com/api/v1/search?query=data%20science%20tools&tags=story</code
              >
            </li>
            <li>
              Extract: First result's <code>title</code>, <code>points</code>,
              <code>url</code>
            </li>
          </ul>
        </li>
        <li>
          <strong>Combine results</strong> into one JSON object:
          <pre><code>{
  "github": {
    "stars": ...,
    "forks": ...,
    "open_issues": ...
  },
  "hackernews": {
    "title": "...",
    "points": ...,
    "url": "..."
  },
  "analysis": "A one-sentence comparison or insight"
}</code></pre>
        </li>
        <li>
          Use <strong>async/await</strong> (JavaScript) or
          <strong>requests</strong> (Python)
        </li>
        <li>Handle API errors gracefully (timeout, 404, rate limit)</li>
      </ol>

      <h3>Deliverable</h3>
      <p>GitHub Gist with code + sample JSON output.</p>

      <input
        type="url"
        id="answer-q-22f3003115-api-orchestration"
        placeholder="https://gist.github.com/..."
        style="width: 100%; padding: 8px;"
      />
    `,
  };
}
