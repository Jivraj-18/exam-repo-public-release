// exam-23f2003102.info.js

export default {
  // Basic exam settings
  title: "GA2 - Deployment Tools",
  start: "2024-11-07T18:30:00+05:30", // Do NOT change unless instructed
  hours: 1.0,

  // Access control
  admin: (email) => email === "23f2003102@ds.study.iitm.ac.in",
  allowed: (email) => email.endsWith("study.iitm.ac.in"),

  // Pre-exam display
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>Do not refresh the page during the exam.</li>
      <li>Do not open multiple tabs.</li>
      <li>Follow all IITM exam rules.</li>
    </ol>
  `,
};
