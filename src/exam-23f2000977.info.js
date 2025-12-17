export default {
  title: "Bonus Activity Submission (23f2000977)",
  start: new Date(), // Exam starts now
  end: new Date(new Date().getTime() + 86400000 * 30), // Open for 30 days
  allowed: () => true, // Allow anyone to try it
  admin: () => true,
  instructions: /* html */ `
    <h1>Student Submission: 23f2000977</h1>
    <p>This is the bonus activity submission containing 5 unique questions.</p>
  `,
};