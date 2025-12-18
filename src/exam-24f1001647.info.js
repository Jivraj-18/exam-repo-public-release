export default {
  // Exam details
  title: "Linux & Git CLI Basics",
  start: "2025-01-01T18:30:00+05:30", // change if needed
  hours: 0.5, // 30 minutes

  // Admin access
  admin: (email) => email.endsWith("@study.iitm.ac.in"),

  // Who can take the exam
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),

  // Instructions shown before exam starts
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>This exam contains <strong>5 questions</strong>.</li>
      <li>All questions are <strong>command-based</strong>.</li>
      <li>Answers must be typed <strong>exactly</strong>.</li>
      <li>No spaces before or after the command.</li>
      <li>You may use the internet.</li>
    </ol>
    <p>Best of luck!</p>
  `,
};
