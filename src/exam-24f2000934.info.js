export default {
  title: "TDS 2025 - Advanced Topics Exam (24f2000934)",
  start: "2026-01-01T00:00:00+05:30",
  end: () => "2026-01-31T23:59:59+05:30",
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
    || email == "anand@study.iitm.ac.in" // Anand S
    || email == "24f2000934@ds.study.iitm.ac.in", // 24f2000934
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      Tools in Data Science - Advanced Topics Exam
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This exam contains 5 advanced questions covering key tools and techniques from the Tools in Data Science course. These questions test deep understanding across multiple domains:</p>
    <ul>
      <li><strong>Data Preparation</strong>: DuckDB for SQL-based data analysis</li>
      <li><strong>Machine Learning</strong>: Vector databases and semantic search with embeddings</li>
      <li><strong>Shell Scripting</strong>: Unix pipelines for log analysis</li>
      <li><strong>DevOps</strong>: Automated data collection with GitHub Actions</li>
      <li><strong>Data Analysis</strong>: Network community detection with Python</li>
    </ul>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Learn what you need</strong>. Reading material is provided, but feel free to skip it if you can answer the question.</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd>. It shows which answers are right or wrong. You can check multiple times.</li>
      <li><strong>Use anything</strong>. You can use any resources you want. The Internet, ChatGPT, friends, whatever.</li>
      <li><strong>Deploy when needed</strong>. Some questions require deploying APIs or creating GitHub repositories.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>DuckDB Multi-Format Data Pipeline (Data Preparation)</li>
      <li>Vector Database Semantic Search (Machine Learning)</li>
      <li>Shell-Based Log Analysis (Unix Tools)</li>
      <li>GitHub Actions Automated Scraper (DevOps)</li>
      <li>Network Community Detection (Data Analysis)</li>
    </ol>
  `,
};
