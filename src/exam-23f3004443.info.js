export default {
  title: "TDS – Advanced Data Sourcing Mini Exam",
  start: "2025-10-28T18:30:00+05:30",
  hours: 1.5,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>All questions are open-internet and tool-friendly.</li>
      <li>You may use scripts, APIs, or command-line tools.</li>
      <li>Enter only the final value requested.</li>
      <li>Do not include explanations unless asked.</li>
      <li>Save frequently.</li>
    </ol>
  `,
};
