import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-22f3003115-metrics-dashboard",
    weight,
    answer: async (value) => {
      if (typeof value !== "string" || value.trim().length < 100) {
        throw new Error(
          "Please provide at least 100 characters describing your visualization strategy",
        );
      }
      return true;
    },
    question: html`
      <h2>Metrics Computation & Visualization Plan</h2>
      <p>Analyze web analytics data and design a dashboard visualization.</p>

      <h3>Input Data (JSON)</h3>
      <pre><code>{
  "pageviews": [
    {"page": "/home", "views": 1500, "avg_time_sec": 45},
    {"page": "/about", "views": 300, "avg_time_sec": 120},
    {"page": "/products", "views": 890, "avg_time_sec": 180},
    {"page": "/contact", "views": 150, "avg_time_sec": 60}
  ],
  "users": {
    "total": 500,
    "new": 120,
    "returning": 380
  }
}</code></pre>

      <h3>Requirements</h3>
      <ol>
        <li>
          <strong>Calculate metrics:</strong>
          <ul>
            <li>Total pageviews</li>
            <li>Most popular page (by views)</li>
            <li>Average time per page (weighted by views)</li>
            <li>New user percentage</li>
          </ul>
        </li>
        <li>
          <strong>Write code</strong> (Python or JS) to compute these metrics
        </li>
        <li>
          <strong>Describe visualization:</strong> Which chart types would you
          use for:
          <ul>
            <li>Pageviews by page (bar chart, pie chart, treemap?)</li>
            <li>New vs Returning users (donut chart, stacked bar?)</li>
            <li>Avg time per page (horizontal bar, heatmap?)</li>
          </ul>
        </li>
        <li>Justify your choices in 3-4 sentences</li>
      </ol>

      <h3>Your Answer</h3>
      <p>Provide:</p>
      <ol>
        <li>GitHub Gist URL with metric calculation code</li>
        <li>Below, describe your visualization strategy (100+ words)</li>
      </ol>

      <p><strong>Gist URL:</strong></p>
      <input
        type="url"
        id="answer-q-22f3003115-metrics-dashboard-url"
        placeholder="https://gist.github.com/..."
        style="width: 100%; padding: 8px; margin-bottom: 12px;"
      />

      <p><strong>Visualization Strategy:</strong></p>
      <textarea
        id="answer-q-22f3003115-metrics-dashboard"
        rows="6"
        placeholder="Describe which chart types and why..."
        style="width: 100%; padding: 8px;"
      ></textarea>
    `,
  };
}
