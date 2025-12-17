export default {
  title: "TDS Bonus Exam",
  start: "2025-12-18T00:00:00+05:30",
  hours: 1,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith(".ac.in"),

  instructions: `
    <h2>TDS Bonus Activity</h2>
    <ul>
      <li>Answer all questions.</li>
      <li>Do not refresh during exam.</li>
      <li>Each question carries equal weight.</li>
    </ul>
  `,
};
