export default {
  title: "TDS Jan 2026 GA - Question Contribution (24DS3000019)",
  start: "2026-01-26T00:00:00+05:30",
  end: "2026-02-02T23:59:59+05:30",
  allowed: () => true,
  read: () => true,
  admin: (email) =>
    email === "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email === "prasanna@study.iitm.ac.in" // PRASANNA S
    || email === "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email === "narayanan@study.iitm.ac.in" // Narayanan R
    || email === "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email === "anand@study.iitm.ac.in", // Anand S
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS Jan 2026 GA - Question Bank Contribution
    </h1>
    
    <p class="lead">
      <strong>Student Submission:</strong> Roll No. 24DS3000019<br>
      <strong>Submission Date:</strong> 18 December 2025
    </p>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This submission contains 5 original questions for the Jan 2026 Graded Assignment question bank, covering essential tools and concepts from the Tools in Data Science course:</p>
    <ul>
      <li><strong>Bash</strong>: Command-line text processing with sort, uniq, and head</li>
      <li><strong>Git</strong>: Understanding commit reachability and detached HEAD state</li>
      <li><strong>REST API</strong>: HTTP status codes for validation errors (422)</li>
      <li><strong>FastAPI</strong>: Pydantic field validation and error responses</li>
      <li><strong>JSON</strong>: Safe property access patterns in Python</li>
    </ul>

    <h2 class="display-6 my-5">Question Design Principles</h2>
    <ul>
      <li>All questions test practical TDS concepts</li>
      <li>Original content - not exact copies of existing questions</li>
      <li>Clear problem statements with specific expected outputs</li>
      <li>Appropriate difficulty level for GA assessment</li>
    </ul>

    <h2 class="display-6 my-5">Instructions for Testing</h2>
    <ol>
      <li><strong>Read each question carefully</strong> and understand the scenario</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd> - you can check multiple times</li>
      <li><strong>Use any resources</strong> - documentation, tools, AI assistants are all allowed</li>
      <li><strong>Each question is worth 1 mark</strong> for a total of 5 marks</li>
    </ol>
  `,
};
