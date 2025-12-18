export default {
  title: "TDS Bonus Exam - 22f3003115",
  start: "2025-12-18T23:30:00+05:30",
  hours: 1.0,
  admin: (email) => email === "22f3003115@ds.study.iitm.ac.in",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),
  instructions: /* html */ `
    <h1>Exam Instructions</h1>
    <ol>
      <li>Answer all questions</li>
      <li>You have 1 hour</li>
      <li>Submit before deadline</li>
    </ol>
  `,
};
