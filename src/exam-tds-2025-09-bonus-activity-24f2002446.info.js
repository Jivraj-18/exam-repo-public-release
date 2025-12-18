export default {
  title: "TDS 2025 Jan Bonus Activity - Example Questions",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "22f3001919@ds.study.iitm.ac.in" || // Carlton D'Silva
    email == "prasanna@study.iitm.ac.in" || // PRASANNA S
    email == "22f3002542@ds.study.iitm.ac.in" || // JIVRAJ SINGH SHEKHAWAT
    email == "22f3002460@ds.study.iitm.ac.in" || // Hritik Roshan Maurya
    email == "jkm@study.iitm.ac.in" || // Jayakrishnan Warriem
    email == "narayanan@study.iitm.ac.in" || // Narayanan R
    email == "sivaadithya@study.iitm.ac.in" || // Sivaadithya M
    email == "anand@study.iitm.ac.in", // Anand S
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 T3 Bonus Activity - Roll no.: 24f2002446
    </h1>

    <h2 class="display-6 my-5">What This Bonus Activity Covers</h2>
    <p>This set of questions spans practical tooling and debugging skills you meet in the Tools in Data Science course:</p>
    <ul>
      <li><strong>Git Bisect</strong>: Use binary search on commit history to pinpoint regressions.</li>
      <li><strong>LangChain + Playwright</strong>: Build an agent tool that browses and summarizes web pages.</li>
      <li><strong>Regex Data Cleaning</strong>: Normalize messy JSON records with pattern-based fixes.</li>
      <li><strong>Classification Analysis</strong>: Predict churn and validate results with simple metrics.</li>
      <li><strong>Mermaid Diagrams</strong>: Communicate processes with lightweight text-to-diagram syntax.</li>
    </ul>

    <h2 class="display-6 my-5">Bonus Activity Instructions</h2>
    <ol>
      <li><strong>Understand the examples</strong>. Study these 8 questions and their solutions to understand the patterns.</li>
      <li><strong>Create new questions</strong>. Following the same structure and difficulty level, create additional questions on Tools in Data Science topics not covered here.</li>
      <li><strong>Submit your questions</strong>. Add your new questions to this assignment by creating pull requests or contacting the instructors.</li>
      <li><strong>Validation</strong>. Your questions will be reviewed for clarity, correctness, and pedagogical value before being added to the main course material.</li>
    </ol>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Learn what you need</strong>. Reading material is provided, but feel free to skip it if you can answer the question.</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd>. It shows which answers are right or wrong. You can check multiple times.</li>
      <li><strong>Use anything</strong>. You can use any resources you want. The Internet, ChatGPT, friends, whatever.</li>
    </ol>

    <p class="mt-4">Explore the questions, use the provided help tabs, and run the built-in checks as often as you like.</p>
  `,
};
