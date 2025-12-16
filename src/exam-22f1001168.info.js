export default {
  title: "TDS Bonus Activity - Roll No: 22f1001168",
  start: "2024-12-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "22f1001168@ds.study.iitm.ac.in" // Student submitting this assignment
    || email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // PRASANNA S
    || email == "22f3002542@ds.study.iitm.ac.in" // JIVRAJ SINGH SHEKHAWAT
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in", // Anand S
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS Bonus Activity - New Questions
    </h1>

    <h2 class="display-6 my-5">Submitted By</h2>
    <p><strong>Roll Number:</strong> 22f1001168</p>
    <p><strong>Email:</strong> 22f1001168@ds.study.iitm.ac.in</p>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This submission contains 5 original questions created for the Tools in Data Science course, covering practical skills across key modules:</p>
    <ul>
      <li><strong>Pandas Data Aggregation</strong>: Working with sales data, filtering, and calculating revenue</li>
      <li><strong>Regular Expressions</strong>: Parsing web server logs to extract specific information</li>
      <li><strong>Git Version Control</strong>: Analyzing repository history and author contributions</li>
      <li><strong>Data Cleaning</strong>: Handling missing values in CSV datasets</li>
      <li><strong>JSON Processing</strong>: Extracting data from nested API responses</li>
    </ul>

    <h2 class="display-6 my-5">Question Design Principles</h2>
    <p>Each question follows these principles:</p>
    <ul>
      <li><strong>Realistic scenarios</strong>: Based on actual data science workflows</li>
      <li><strong>Personalized data</strong>: Uses seedrandom to generate unique datasets per student</li>
      <li><strong>Automated validation</strong>: Includes answer checking with helpful error messages</li>
      <li><strong>Learning support</strong>: Provides hints and recommended approaches</li>
      <li><strong>Tool agnostic</strong>: Can be solved with Python, JavaScript, or command-line tools</li>
    </ul>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Read each question carefully</strong>. Understand the task and the expected output format.</li>
      <li><strong>Download any provided data files</strong> using the download buttons.</li>
      <li><strong>Process the data</strong> using your preferred tools (Python, Excel, command-line, etc.).</li>
      <li><strong>Submit your answers</strong> and press <kbd>Check</kbd> to validate them.</li>
      <li><strong>Review feedback</strong>. Error messages will guide you if your answer is incorrect.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li><strong>Pandas: Sales Data Aggregation</strong> - Filter and aggregate sales revenue by region and product</li>
      <li><strong>Regular Expression: Web Server Log Analysis</strong> - Parse Apache logs to count specific HTTP status codes</li>
      <li><strong>Git: Repository History Analysis</strong> - Count commits by a specific author in git history</li>
      <li><strong>CSV Data Cleaning: Missing Values</strong> - Remove incomplete records and filter employee data</li>
      <li><strong>JSON: Extract Nested API Data</strong> - Navigate nested JSON structures to extract population data</li>
    </ol>

    <h2 class="display-6 my-5">Notes</h2>
    <ul>
      <li>All questions are auto-graded with instant feedback</li>
      <li>You can attempt each question multiple times</li>
      <li>Use any resources and tools available to you</li>
      <li>Data is personalized to your email to prevent copying</li>
    </ul>
  `,
};
