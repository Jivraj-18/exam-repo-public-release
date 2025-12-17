export default {
  title: "TDS Advanced Topics Exam - 23f3000168",
  start: "2025-01-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "anand@study.iitm.ac.in" // Anand S
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "23f3000168@ds.study.iitm.ac.in", // Exam creator
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS Advanced Topics Exam
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This exam contains 5 advanced questions covering critical tools and techniques from the Tools in Data Science
      course. These questions test your ability to apply sophisticated concepts and integrate multiple technologies
      to solve real-world data science problems.
    </p>

    <h2 class="display-6 my-5">Topics Covered</h2>
    <ul>
      <li><strong>Git Repository Forensics</strong>: Advanced version control analysis with multi-criteria filtering and statistical aggregation</li>
      <li><strong>SQL Window Functions</strong>: Time-series analysis using DuckDB with cumulative calculations and CTEs</li>
      <li><strong>Semantic Search</strong>: Building a complete vector-based search system using embeddings and cosine similarity</li>
      <li><strong>CI/CD Automation</strong>: Creating automated data collection pipelines with GitHub Actions and scheduled workflows</li>
      <li><strong>REST API Development</strong>: Implementing production-grade APIs with comprehensive validation, CORS, and error handling</li>
    </ul>

    <h2 class="display-6 my-5">Exam Instructions</h2>
    <ol>
      <li><strong>Time Commitment</strong>: Each question requires substantial implementation work. Plan for 30-60 minutes per question.</li>
      <li><strong>Resources Allowed</strong>: You may use any resources including documentation, AI assistants, and course materials.</li>
      <li><strong>Validation</strong>: All questions include automated validation. You can check your answers multiple times.</li>
      <li><strong>Deployment Required</strong>: Some questions require deploying services to public hosting platforms (GitHub, Vercel, etc.)</li>
      <li><strong>API Keys</strong>: You may need OpenAI API keys for embedding questions. Ensure you have access before starting.</li>
    </ol>

    <h2 class="display-6 my-5">Question Weights</h2>
    <p>Questions are weighted based on complexity:</p>
    <ul>
      <li><strong>Question 1</strong>: Git Repository Forensics (Weight: 1.5)</li>
      <li><strong>Question 2</strong>: DuckDB Window Functions (Weight: 2.0)</li>
      <li><strong>Question 3</strong>: Semantic Search System (Weight: 2.0)</li>
      <li><strong>Question 4</strong>: GitHub Actions Pipeline (Weight: 1.5)</li>
      <li><strong>Question 5</strong>: Advanced REST API (Weight: 2.0)</li>
    </ul>
    <p><strong>Total Weight: 9.0 points</strong></p>

    <h2 class="display-6 my-5">Grading Criteria</h2>
    <p>Each question is automatically graded based on:</p>
    <ul>
      <li>Correctness of implementation</li>
      <li>Proper use of required technologies and techniques</li>
      <li>Adherence to specifications (data formats, API contracts, etc.)</li>
      <li>Error handling and edge case management</li>
    </ul>

    <h2 class="display-6 my-5">Technical Requirements</h2>
    <p>Ensure you have the following tools installed:</p>
    <ul>
      <li><strong>Git</strong>: For repository analysis and version control</li>
      <li><strong>DuckDB</strong>: For SQL-based data analysis</li>
      <li><strong>Python 3.11+</strong>: With uv, httpx, fastapi, uvicorn</li>
      <li><strong>OpenAI API Access</strong>: For embedding generation</li>
      <li><strong>GitHub Account</strong>: For Actions workflows</li>
      <li><strong>Hosting Platform Access</strong>: Vercel, Railway, or Render for API deployment</li>
    </ul>

    <h2 class="display-6 my-5">Getting Help</h2>
    <p>
      If you encounter technical issues with the exam platform itself (not question content), contact the course
      administrators. For question clarifications, review the provided templates and documentation links carefully.
    </p>

    <div class="alert alert-success mt-5">
      <h3>Ready to Begin?</h3>
      <p>
        These questions are challenging and designed to test advanced proficiency. Take your time, read each question
        carefully, and demonstrate your mastery of the Tools in Data Science curriculum.
      </p>
      <p><strong>Good luck!</strong></p>
    </div>
  `,
};
