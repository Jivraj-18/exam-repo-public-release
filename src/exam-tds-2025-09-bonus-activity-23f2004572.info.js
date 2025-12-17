export default {
  // Basic exam settings
  title: "TDS Bonus Activity - Roll 23f2004572",
  start: "2025-12-18T00:00:00+05:30", // Available from Dec 18, 2025
  hours: 24.0, // 24 hour window for submission

  // Access control
  admin: (email) => email === "anand@study.iitm.ac.in", // Course instructor
  allowed: (email) => email.endsWith("@study.iitm.ac.in"), // All IITM students

  // Pre-exam instructions
  instructions: /* html */ `
    <h1>TDS 2025-09 Bonus Activity Instructions</h1>
    <h2>Roll Number: 23f2004572</h2>
    
    <div class="alert alert-info">
      <strong>Purpose:</strong> This bonus activity contains 5 unique questions created for the Tools in Data Science course.
      These questions test understanding of Docker optimization, GitHub Actions, DuckDB, LLM APIs, and web scraping ethics.
    </div>

    <h3>Instructions</h3>
    <ol>
      <li><strong>Read Carefully:</strong> Each question has randomized parameters based on your email. Your values are unique.</li>
      <li><strong>Calculate Precisely:</strong> Use the formulas and data provided to compute exact numerical answers.</li>
      <li><strong>Show Work:</strong> While only the final answer is submitted, keep your calculations for reference.</li>
      <li><strong>Answer Format:</strong> Most questions require integer answers (whole numbers). Some may require decimals (to 2 places).</li>
      <li><strong>Time Limit:</strong> You have 24 hours from the start time to complete all 5 questions.</li>
      <li><strong>Tools Allowed:</strong> You may use Python, Excel, DuckDB, calculators, or any computational tools to verify answers.</li>
    </ol>

    <h3>Question Topics</h3>
    <ul>
      <li><strong>Q1:</strong> Docker Multi-Stage Build Optimization (Week 2 - Docker)</li>
      <li><strong>Q2:</strong> GitHub Actions Parallel Job Duration (Week 2 - GitHub Actions)</li>
      <li><strong>Q3:</strong> DuckDB Window Function Analysis (Week 6 - DuckDB)</li>
      <li><strong>Q4:</strong> LLM Token Cost Calculator (Week 4 - LLM APIs)</li>
      <li><strong>Q5:</strong> Web Scraping Rate Limit Calculator (Week 5 - Web Scraping)</li>
    </ul>

    <h3>Scoring</h3>
    <p>Each question is worth 1 mark, for a total of 5 bonus marks.</p>

    <div class="alert alert-warning">
      <strong>Academic Integrity:</strong> While you may use computational tools, the work must be your own.
      Do not share your specific question parameters or answers with other students.
    </div>

    <h3>Good Luck!</h3>
    <p>These questions test practical skills you'll use in real data science and engineering workflows.</p>
  `,
};