export default {
  title: "GA2 Assessment",
  start: "2025-12-17T00:00:00+05:30",
  hours: 2,
  admin: (email) => email === "admin@example.com",
  allowed: () => true,
  instructions: /* html */ `
    <h1 class="display-3 my-5">GA2 Assessment</h1>
    <p>This assessment contains 5 questions covering various data science tools and techniques.</p>
    <ul>
      <li>Excel formulas for cost allocation</li>
      <li>Text editor analysis of incident timelines</li>
      <li>Shell script analysis for concurrency</li>
      <li>JSON configuration drift detection</li>
      <li>DuckDB SQL queries for SLA breach analysis</li>
    </ul>
    <p>Answer all questions to the best of your ability. Good luck!</p>
  `,
};
