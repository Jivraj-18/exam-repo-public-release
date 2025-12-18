export default {
  title: "23f2000732 - Bonus Marks Questions",
  start: "2025-12-18T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // PRASANNA S
    || email == "22f3002542@ds.study.iitm.ac.in" // JIVRAJ SINGH SHEKHAWAT
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in", // Anand S
  instructions: /* html */ `
  <h1 class="display-3 my-5">
    TDS 2025 Sep - Bonus Activity (Fundamentals) by 23f2000732
  </h1>

  <h2 class="display-6 my-5">Overview</h2>
  <p>
    This activity contains 5 short, input-based questions designed to quickly assess
    core technical fundamentals required across the Tools in Data Science course.
    Each question is deterministic, auto-graded, and solvable using basic reasoning
    or by running small snippets locally.
  </p>

  <ul>
    <li><strong>Command Line</strong>: Text filtering with <code>grep</code></li>
    <li><strong>Web Fundamentals</strong>: HTTP status codes</li>
    <li><strong>Version Control</strong>: Git branch concepts</li>
    <li><strong>Databases</strong>: SQL aggregation with <code>COUNT</code></li>
    <li><strong>Programming</strong>: Python list operations</li>
  </ul>

  <h2 class="display-6 my-5">Instructions</h2>
  <ol>
    <li>Read each question carefully and understand the scenario.</li>
    <li>Compute the answer using reasoning, a terminal, or a small script.</li>
    <li>Enter only the final output requested (number or short text).</li>
    <li>You may retry answers until they are correct.</li>
  </ol>

  <h2 class="display-6 my-5">How to Work</h2>
  <ol>
    <li>You may use any resources: documentation, internet, or AI tools.</li>
    <li>Answers are auto-validated; formatting matters only where specified.</li>
    <li>Each question is independent and carries equal weight.</li>
  </ol>

  <h2 class="display-6 my-5">Questions Included</h2>
  <ol>
    <li>Count matching lines using <code>grep</code> (Linux / CLI)</li>
    <li>Interpret an HTTP status code (Web Fundamentals)</li>
    <li>Determine repository branch count (Git)</li>
    <li>Evaluate a <code>COUNT(*)</code> SQL query (Databases)</li>
    <li>Compute <code>len()</code> of a Python list (Python Basics)</li>
  </ol>
`,

};
