export default {
  title: "TDS 2025 Bonus Activity - Questions by 22f1001611",
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
      TDS 2025 Bonus Activity - Questions by Roll No. 22f1001611
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This collection contains 5 original questions covering diverse Tools in Data Science topics:</p>
    <ul>
      <li><strong>CSV Data Aggregation</strong>: Calculating revenue totals from sales data</li>
      <li><strong>Regular Expression Log Parsing</strong>: Analyzing server logs to identify errors</li>
      <li><strong>Pandas Pivot Tables</strong>: Creating multi-dimensional summaries of employee data</li>
      <li><strong>Git Commit Analysis</strong>: Mining version control history for contributor insights</li>
      <li><strong>XML Data Extraction</strong>: Querying structured XML documents</li>
    </ul>

    <h2 class="display-6 my-5">Question Approach</h2>
    <p>
      These questions emphasize practical data manipulation skills essential for data science workflows.
      Each question uses deterministic random generation to provide unique datasets per student while
      maintaining consistent difficulty levels.
    </p>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Analyze the data</strong> provided in each question carefully</li>
      <li><strong>Use any tools</strong> you're comfortable with: Python, JavaScript, Excel, command-line tools, or LLMs</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd> - you can check multiple times</li>
      <li><strong>Read the hints</strong> if you're stuck - they suggest useful libraries or approaches</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Aggregate Sales Data from CSV (Data Wrangling)</li>
      <li>Parse Server Logs with Regular Expressions (Text Processing)</li>
      <li>Create Pivot Table Summary in Python (Data Analysis)</li>
      <li>Analyze Git Commit History (Version Control Analysis)</li>
      <li>Extract Data from XML Structure (Structured Data Parsing)</li>
    </ol>

    <p class="mt-5">
      <small>Created by student 22f1001611 for TDS Bonus Activity - December 2025</small>
    </p>
  `,
};
