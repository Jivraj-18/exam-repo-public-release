export default {
  // Basic exam settings
  title: "Exam 24f2004876",
  start: "2024-11-07T18:30:00+05:30", // When exam becomes available
  hours: 1.0, // Time limit

  // Access control
  admin: (email) => email == "admin@example.com", // Who can administer
  allowed: (email) => email.endsWith(".edu"), // Who can take exam

  // Pre-exam display
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>Answer all questions clearly and concisely.</li>
      <li>Justify assumptions wherever applicable.</li>
      <li>Pseudocode is acceptable where full code is not required.</li>
      <li>Plagiarism or copied answers may result in zero marks.</li>
    </ol>
  `,
};
