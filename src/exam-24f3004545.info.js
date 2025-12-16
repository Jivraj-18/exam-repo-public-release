export default {
  title: "TDS Bonus Activity - Roll No: 24f3004545",
  start: "2024-12-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "24f3004545@ds.study.iitm.ac.in" // You
    || email == "prasanna@study.iitm.ac.in" // Course Instructor
    || email == "22f3001919@ds.study.iitm.ac.in" // TA
    || email == "22f3002542@ds.study.iitm.ac.in" // TA
    || email == "22f3002460@ds.study.iitm.ac.in" // TA
    || email == "jkm@study.iitm.ac.in" // TA
    || email == "narayanan@study.iitm.ac.in" // TA
    || email == "sivaadithya@study.iitm.ac.in" // TA
    || email == "anand@study.iitm.ac.in", // Instructor
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS Bonus Activity - New Questions
    </h1>
    <h2 class="display-6 my-5">Submitted By</h2>
    <p><strong>Roll Number:</strong> 24f3004545</p>
    <p><strong>Email:</strong> 24f3004545@ds.study.iitm.ac.in</p>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This submission contains 5 original questions created for the Tools in Data Science course, covering practical skills across key modules:</p>
    <ul>
      <li><strong>Linux & CLI</strong>: Parsing corrupted server logs using Regex and standard shell tools.</li>
      <li><strong>Git Forensics</strong>: Recovering deleted files and identifying commits in history.</li>
      <li><strong>SQL Analytics</strong>: Advanced window functions for time-series analysis.</li>
      <li><strong>Data Preparation</strong>: Cleaning and fixing malformed JSON data pipelines.</li>
      <li><strong>LLM & APIs</strong>: Building a "Function Calling" agent with FastAPI.</li>
    </ul>

    <h2 class="display-6 my-5">Question Design Principles</h2>
    <p>Each question follows these principles:</p>
    <ul>
      <li><strong>Realistic scenarios</strong>: Based on actual DevOps and Data Science incidents.</li>
      <li><strong>Automated validation</strong>: Uses <code>server_validation</code> to test endpoints against rigorous assertions.</li>
      <li><strong>Security First</strong>: Python solutions include CORS best practices.</li>
      <li><strong>Tool agnostic</strong>: Can be solved with any language, though Python/FastAPI is recommended.</li>
    </ul>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li><strong>Log Analysis Endpoint</strong> - Filter corrupted logs to count specific IP subnets.</li>
      <li><strong>Git Recovery Endpoint</strong> - Identify the exact commit hash where critical data was lost.</li>
      <li><strong>SQL Window Functions</strong> - Calculate rolling averages on financial datasets.</li>
      <li><strong>JSON Cleaning Endpoint</strong> - Repair and aggregate malformed JSON records.</li>
      <li><strong>LLM Function Mapper</strong> - Map natural language prompts to structured API calls.</li>
    </ol>
  `,
};
