export default {
  id: "exam-24f2004829",
  title: "TDS Bonus Exam – 24f2004829",
  start: "2025-12-18T23:30:00+05:30", 
  hours: 1.0,
  admin: (email) => email === "24f2004829@ds.study.iitm.ac.in",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),
  instructions: `
<h1>Exam Instructions</h1>
<ul>
  <li>Answer all questions.</li>
  <li>Write clean, readable code.</li>
  <li>Use only the allowed tools and libraries.</li>
</ul>
`,
};
