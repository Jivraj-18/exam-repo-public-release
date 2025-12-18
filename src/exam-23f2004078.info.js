export default {
  // Basic exam settings
  title: "TDS Bonus Activity - Roll 23f2004078",
  start: "2025-12-18T00:00:00+05:30",
  hours: 2.0, // Time limit

  // Access control
  admin: (email) => email.includes("23f2004078"),
  allowed: (email) => true, // Public for now

  // Pre-exam display
  instructions: /* html */ `
    <h1>TDS Bonus Activity - 5 Original Questions</h1>
    <p>This exam contains <strong>5 unique questions</strong> covering advanced Tools in Data Science topics:</p>
    <ol>
      <li><strong>Cloudflare Workers KV</strong> - Cloud deployment and caching</li>
      <li><strong>D3.js Data Binding</strong> - Data visualization</li>
      <li><strong>DuckDB Window Functions</strong> - Modern database queries</li>
      <li><strong>LangChain RAG Pipeline</strong> - LLM orchestration</li>
      <li><strong>Polars LazyFrame</strong> - High-performance dataframes</li>
    </ol>
    <p><strong>Instructions:</strong></p>
    <ul>
      <li>Answer all 5 questions</li>
      <li>Each question is worth 1 point</li>
      <li>Click "Check" to validate your answers</li>
      <li>Your score will appear at the bottom</li>
    </ul>
  `,
};
