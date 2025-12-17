export default {
  title: "TDS Bonus Activity - 23f2001063",
  start: "2025-12-17T00:00:00+05:30",
  hours: 24.0,

  admin: (email) => email === "23f2001063@ds.study.iitm.ac.in",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in") || email.endsWith("@study.iitm.ac.in"),

  instructions: /* html */ `
    <h1>TDS Bonus Activity Questions</h1>
    <p>Created by: 23f2001063</p>
    <h2>Questions Overview</h2>
    <ol>
      <li><strong>Python httpx:</strong> Weather API Data Extraction using httpx library</li>
      <li><strong>Git Commands:</strong> Analyze git log output to count commits by author</li>
      <li><strong>DuckDB SQL:</strong> Aggregate sales data using SQL queries</li>
      <li><strong>Pandas:</strong> Handle missing values in a dataset</li>
      <li><strong>Base64:</strong> Encode and decode data using Base64</li>
    </ol>
    <h2>Instructions</h2>
    <ul>
      <li>Read each question carefully before answering.</li>
      <li>Use the tools mentioned (Python, DuckDB, Git commands) to solve the problems.</li>
      <li>Enter your answers in the provided input fields.</li>
    </ul>
  `,
};
