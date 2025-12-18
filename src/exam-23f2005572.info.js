export default {
  title: "TDS 2025 Sep Bonus Activity - Roll 23f2005572",
  start: "2025-12-18T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true,
  read: () => true,
  admin: (email) =>
    email == "23f2005572@ds.study.iitm.ac.in" ||
    email == "22f3002542@ds.study.iitm.ac.in" || // JIVRAJ SINGH SHEKHAWAT (Repo Owner)
    email == "anand@study.iitm.ac.in", // Anand S (Instructor)
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity - 23f2005572
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This assignment includes 5 advanced questions covering critical Tools in Data Science concepts:</p>
    <ul>
      <li><strong>API Rate Limiting</strong>: Request throttling with time-window validation</li>
      <li><strong>Schema Validation</strong>: Nested JSON validation with type constraints</li>
      <li><strong>Data Type Detection</strong>: Automatic type inference and conversion from CSV</li>
      <li><strong>SQL Security</strong>: Parameterized queries preventing SQL injection</li>
      <li><strong>Cache Management</strong>: TTL-based response caching with lifecycle tracking</li>
    </ul>

    <h2 class="display-6 my-5">How to Approach These Questions</h2>
    <ol>
      <li><strong>Read carefully</strong>. Understand what each question is asking.</li>
      <li><strong>Solve step by step</strong>. Think through the logic before answering.</li>
      <li><strong>Test your answer</strong>. Click Check to validate.</li>
      <li><strong>Learn from mistakes</strong>. Re-read and try different approaches.</li>
      <li><strong>Use resources</strong>. Documentation, AI, peers - use what helps!</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>API Rate Limiting Validator - Middleware pattern validation</li>
      <li>JSON Schema Validator - Type checking with constraints</li>
      <li>CSV Data Type Detector - Automatic type inference</li>
      <li>SQL Query Builder - Parameterized query construction</li>
      <li>API Response Cache - TTL-based cache management</li>
    </ol>
  `,
};
