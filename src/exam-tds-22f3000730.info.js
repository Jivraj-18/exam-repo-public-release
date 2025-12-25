export default {
  title: "TDS 2025 Sep Bonus Activity - 22f3000730",
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
      TDS 2025 Sep Bonus Activity - 22f3000730
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This exam contains questions created for the Tools in Data Science bonus activity. The questions focus on regex pattern matching and text extraction using Python for data processing.</p>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Read the questions carefully</strong>. Each question provides a scenario and specific pattern requirements.</li>
      <li><strong>Download the data files</strong>. Click the download buttons to get the JSONL data files needed for each question.</li>
      <li><strong>Write your solution</strong>. Use Python's <code>re</code> module to create regex patterns that match the required format.</li>
      <li><strong>Extract and count</strong>. Extract matching patterns from text fields and count unique occurrences.</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd>. It shows which answers are right or wrong. You can check multiple times.</li>
      <li><strong>Use any resources</strong>. You can use any resources you want. The Internet, ChatGPT, friends, whatever.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Log Searching and Analysis - Use regex to search log files for specific error patterns within time windows</li>
      <li>Timestamp Statistics - Extract timestamps, parse components, and calculate median values</li>
      <li>Pattern Validation and Quality Analysis - Identify valid code patterns from examples and calculate data quality percentages</li>
      <li>Multi-Pattern Correlation Analysis - Extract multiple patterns, correlate data, and perform statistical analysis</li>
      <li>Data Quality Scoring - Match multiple patterns with weights and calculate average quality scores</li>
    </ol>
  `,
};

