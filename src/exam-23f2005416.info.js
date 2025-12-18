export default {
  // Basic exam settings
  title: "Exam Title",
  start: "2024-11-07T18:30:00+05:30", // When exam becomes available
  hours: 1.0, // Time limit

  // Access control
  admin: (email) => email == "23f2005416@ds.study.iitm.ac.in", // Who can administer
  allowed: (email) => email.endsWith(".edu"), // Who can take exam

  // Pre-exam display
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>Rules...</li>
    </ol>
  `,
};