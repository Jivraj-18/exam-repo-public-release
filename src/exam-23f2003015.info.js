export default {
  title: "TDS Bonus Activity — exam-23f2003015",

  start: "2025-12-18T18:30:00+05:30",

  hours: 1.0,

  admin: (email) => email.endsWith("@gmail.com"),

  allowed: (email) => true,

  instructions: `
    <h1>Instructions</h1>
    <ol>
      <li>Each question expects a single answer.</li>
      <li>Follow the task description carefully.</li>
      <li>No partial submissions.</li>
    </ol>
  `,
};
