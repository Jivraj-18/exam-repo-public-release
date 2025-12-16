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
      Data Science Assessment - Set A
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This assessment covers 5 key computational problems testing your ability to handle real-world data scenarios. The questions are designed to test the following skills:</p>
    <ul>
      <li><strong>Log Analysis</strong>: Security anomaly detection from server logs</li>
      <li><strong>Data Cleaning</strong>: Reconciliation of messy financial CSVs</li>
      <li><strong>Data Wrangling</strong>: Auditing complex nested JSON inventories</li>
      <li><strong>SQL Logic</strong>: Calculating overtime from timesheet data</li>
      <li><strong>Text Processing</strong>: Extracting patterns from unstructured text</li>
    </ul>

    <h2 class="display-6 my-5">Assessment Instructions</h2>
    <ol>
      <li><strong>Unique Datasets</strong>. Each question generates data specific to your ID. Copying answers will result in failure.</li>
      <li><strong>Tool Flexibility</strong>. You are free to use Python, Excel, SQL, or command-line tools to solve these problems.</li>
      <li><strong>Stability</strong>. Ensure a stable internet connection. Do not refresh the page once the exam has started.</li>
      <li><strong>Submission</strong>. Submit your numerical or text answers in the provided input fields before the timer expires.</li>
    </ol>

    <h2 class="display-6 my-5">How to Use This Interface</h2>
    <ol>
      <li><strong>Download</strong>. Click the button to download the generated dataset for the question.</li>
      <li><strong>Analyze</strong>. Process the file locally using your preferred tools.</li>
      <li><strong>Verify</strong>. Enter your answer and press <kbd>Check</kbd>.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Security Audit: Brute Force Detection</li>
      <li>Finance: Net Revenue Reconciliation</li>
      <li>Operations: Damaged Inventory Audit</li>
      <li>HR: Overtime Calculation</li>
      <li>Data Entry: Invoice ID Scraping</li>
    </ol>
  `,
};