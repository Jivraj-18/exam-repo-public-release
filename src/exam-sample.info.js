export default {
    // Basic exam settings
    title: "Sample Exam",
    start: "2024-01-01T00:00:00+05:30", // When exam becomes available
    hours: 1.0, // Time limit

    // Access control
    admin: (email) => email == "admin@example.com", // Who can administer
    allowed: (email) => true, // Anyone can take

    // Pre-exam display
    instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>This is a sample exam.</li>
      <li>Good luck!</li>
    </ol>
  `,
};
