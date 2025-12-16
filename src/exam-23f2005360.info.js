export default {
  title: "Bonus Exam – 23f2005360",
  start: "2025-12-18T00:00:00+05:30",
  hours: 1.0,

  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  instructions: `
    <h2>Instructions</h2>
    <ol>
      <li>This exam contains 5 tough conceptual questions.</li>
      <li>All questions are compulsory.</li>
      <li>No negative marking.</li>
    </ol>
  `,
};
