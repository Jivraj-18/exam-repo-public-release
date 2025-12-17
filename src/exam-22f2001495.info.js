export default {
  title: "Operations & Data Tooling Exam",
  start: "2025-01-20T18:30:00+05:30",
  hours: 1.0,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>All questions are auto-evaluated.</li>
      <li>Use the specified tools for each question.</li>
      <li>Numeric answers must not include commas.</li>
      <li>SQL answers must return exactly the requested shape.</li>
    </ol>
  `,
};
