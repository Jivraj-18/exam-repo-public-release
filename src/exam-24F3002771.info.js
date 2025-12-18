export default {
  title: "README Comprehension Exam - 24F3002771",
  start: "2024-12-18T00:00:00+05:30",
  hours: 1.0,
  
  admin: (email) => email == "admin@example.com",
  allowed: (email) => true,
  
  instructions: /* html */ `
    <h1>Instructions</h1>
    <ol>
      <li>This exam tests your understanding of the README file in this repository</li>
      <li>Read each question carefully and provide exact answers as specified in the README</li>
      <li>All questions are based on the setup instructions and conventions described in the README</li>
      <li>Pay attention to exact naming conventions and command syntax</li>
      <li>You have 1 hour to complete this exam</li>
    </ol>
  `,
};