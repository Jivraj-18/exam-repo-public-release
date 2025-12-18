export default {
  title: "Tools in Data Science – Practice Exam",

  start: "2025-01-01T00:00:00+05:30",
  hours: 1.0,

  admin: (email) => email === "admin@example.com",
  allowed: (email) => email.endsWith(".edu"),

  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>This is an individual, open-resource exam.</li>
      <li>You may use the internet, documentation, and tools.</li>
      <li>Each question is auto-graded.</li>
      <li>Answers must be exact (numbers or text as requested).</li>
      <li>Do not refresh unnecessarily; answers are saved locally.</li>
    </ol>
    <p>
      The exam focuses on practical reasoning across JSON, CLI tools,
      web APIs, Pandas-style analysis, and SQL logic.
    </p>
  `,
};
