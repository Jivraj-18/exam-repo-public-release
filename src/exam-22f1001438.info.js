export default {
  title: "TDS Exam - 22f1001438",
  start: "2024-12-17T00:00:00+05:30",
  hours: 2.5,
  admin: (email) => email.endsWith("@iitm.ac.in") || email === "student@example.com",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in") || email === "student@example.com",
  instructions: html`<h1>Start your Exam</h1><p>Good luck!</p>`,
};