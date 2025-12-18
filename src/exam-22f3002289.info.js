export default {
  title: "GA6 – Data Preparation",
  start: "2025-09-01T00:00:00+05:30",
  hours: 1,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  instructions: /* html */ `
    <h2>GA6 – Data Preparation</h2>
    <ol>
      <li>This exam tests practical data cleaning skills.</li>
      <li>Questions span Excel, Shell, JSON, DuckDB, and Editors.</li>
      <li>No external collaboration is allowed.</li>
    </ol>
  `,
};
