export default {
  title: "TDS Exam - Roll No: 22f1001438",
  start: "2024-12-17T00:00:00+05:30",
  hours: 2.5,
  admin: (email) => email === "22f1001438@ds.study.iitm.ac.in" || email === "student@example.com",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in") || email === "student@example.com",
  instructions: `<h1>TDS Exam Questions</h1><p>Roll Number: 22f1001438</p>`
};