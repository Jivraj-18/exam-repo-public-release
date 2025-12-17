export default {
  title: "TDS 2025 Sep Bonus Activity - Example Questions",
  start: "2025-09-01T00:00:00+05:30",
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
      TDS 2025 Sep Bonus Activity
    </h1>

    <h2 class="display-6 my-5">Purpose</h2>
    <p>
      This bonus activity is designed to help students practice <strong>question design</strong>
      using concepts from the <em>Tools in Data Science</em> course.
      The questions created here may later be reused in graded assignments.
    </p>

    <h2 class="display-6 my-5">What You Need to Do</h2>
    <ol>
      <li>Create <strong>5 new questions</strong> based on TDS concepts.</li>
      <li>Each question must follow the existing <code>q-*.js</code> format.</li>
      <li>Questions should be <strong>original</strong> and not copied from existing examples.</li>
      <li>Commit your work to a branch named <code>exam-&lt;roll_no&gt;</code>.</li>
      <li>Submit your work via a Pull Request before the deadline.</li>
    </ol>

    <h2 class="display-6 my-5">Topics You Can Use</h2>
    <ul>
      <li>Data Wrangling (JSON, CSV, filtering, sorting)</li>
      <li>Spreadsheets (Excel formulas, dynamic arrays)</li>
      <li>Data Preparation (DuckDB, SQL-style transformations)</li>
      <li>Data Transformation (dbt models, staging logic)</li>
      <li>Visualization or Analysis workflows</li>
    </ul>

    <h2 class="display-6 my-5">Evaluation Criteria</h2>
    <ul>
      <li>Questions must be technically correct</li>
      <li>Must align with TDS syllabus</li>
      <li>Must be auto-gradable</li>
      <li>Should test understanding, not memorization</li>
    </ul>

    <h2 class="display-6 my-5">How This Assignment Works</h2>
    <ol>
      <li>You can view all questions without logging in.</li>
      <li>Logged-in users can attempt and check answers.</li>
      <li>You may use external resources while attempting.</li>
      <li>Answers can be checked multiple times.</li>
    </ol>

    <p class="mt-5">
      <strong>Note:</strong> Only original, syllabus-aligned questions will be considered for bonus marks.
    </p>
  `,
};
