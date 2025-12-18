export default {
  // Basic exam settings
  title: "TDS 2025 September GA4 - Large Language Models",
  start: "2025-10-01T00:00:00+05:30", // set to a time when it should be available
  hours: 1.0,

  // Access control
  admin: (email) => email === "admin.example.com",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),

  // Pre-exam display
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>Read what you need.</li>
      <li>Save regularly.</li>
      <li>Use any resources you want.</li>
    </ol>
  `,
};
