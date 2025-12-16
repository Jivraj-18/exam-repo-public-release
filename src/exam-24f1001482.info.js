export default {
  // Basic exam settings
  title: "Exam Title",
  start: "2024-11-07T18:30:00+05:30", // When exam becomes available
  hours: 1.0, // Time limit

  // Access control
  admin: (email) => email == "admin@example.com", // Who can administer
  allowed: (email) => email.endsWith(".edu"), // Who can take exam
  
  instructions: /* html */ `
    <h1>Assessment Instructions</h1>
    <ol>
      <li>This exam contains 5 computational questions.</li>
      <li>Each dataset is generated uniquely for your specific ID.</li>
      <li>You may use Python, Excel, or SQL to find the answers.</li>
      <li>Ensure your internet connection is stable throughout the duration.</li>
      <li>Do not refresh the page once the exam has started.</li>
      <li>Submit your final answers before the timer runs out.</li>
    </ol>
  `,
};