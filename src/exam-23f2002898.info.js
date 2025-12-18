export default {
  title: "GA7 – Applied Data Analysis",
  start: "2025-09-15T09:00:00+05:30",
  hours: 1.0,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>This exam tests applied data analysis skills.</li>
      <li>You may use Excel, Python, SQL, DuckDB, and AI tools.</li>
      <li>Each question is independent.</li>
      <li>Answers are deterministic based on the provided data.</li>
      <li>Save frequently — your last save is graded.</li>
    </ol>
  `,
};
