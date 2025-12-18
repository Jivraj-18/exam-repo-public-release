export default {
  // Basic exam settings
  title: "TDS Exam - Roll No: 22f1001438",
  start: "2024-12-17T00:00:00+05:30", // Available from Dec 17
  hours: 2.5, // 2.5 hour time limit

  // Access control
  admin: (email) => 
    email === "22f1001438@ds.study.iitm.ac.in" || email === "admin@example.com",
    
  allowed: (email) => 
    email.endsWith("@ds.study.iitm.ac.in") || email === "student@example.com",

  // Pre-exam display
  instructions: /* html */ `
    <h1>TDS Final Assessment</h1>
    <p><b>Roll Number:</b> 22f1001438</p>
    <ol>
      <li>Ensure you have a stable internet connection.</li>
      <li>Answer all 5 questions covering API, Data, and LLMs.</li>
      <li>Your progress is tracked based on your authenticated email.</li>
    </ol>
  `,
};