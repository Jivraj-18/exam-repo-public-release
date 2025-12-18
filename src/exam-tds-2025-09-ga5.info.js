export default {
  title: "TDS 2025 Sept GA5 – Data Sourcing",

  // Exam availability
  start: "2025-09-01T00:00:00+05:30",
  hours: 3,

  // Access control
  admin: (email) => email.endsWith("@iitm.ac.in"),
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),

  // Instructions shown before exam
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ul>
      <li>This is an open-book assignment.</li>
      <li>You may use any tools, libraries, or online resources.</li>
      <li>Save frequently. Reloading is allowed.</li>
      <li>Answers are auto-evaluated.</li>
      <li>Hackability is allowed.</li>
    </ul>
  `,
};
