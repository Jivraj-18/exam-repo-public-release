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
    <p>This exam contains 7 advanced questions covering key tools and techniques from the Tools in Data Science course. These questions test deep understanding across multiple domains:</p>
    <ul>
      <li><strong>Database Processing</strong>: DuckDB for multi-format data analysis</li>
      <li><strong>Vector Search</strong>: Semantic search with embeddings and vector databases</li>
      <li><strong>Shell Scripting</strong>: Unix pipeline for log analysis</li>
      <li><strong>AI Agents</strong>: Type-safe tool-calling agents with Pydantic AI</li>
      <li><strong>DevOps</strong>: Automated data collection with GitHub Actions</li>
      <li><strong>Network Analysis</strong>: Community detection in social graphs</li>
      <li><strong>Hybrid RAG</strong>: Combining semantic and keyword search with TypeSense</li>
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
      <li>DuckDB Multi-Format Data Pipeline (Database Processing)</li>
      <li>Vector Database Semantic Search (ML/AI)</li>
      <li>Shell-Based Log Analysis (Unix Tools)</li>
      <li>Pydantic AI Agent with Custom Tools (AI Agents)</li>
      <li>GitHub Actions Automated Scraper (DevOps)</li>
      <li>Network Community Detection (Graph Analysis)</li>
      <li>Hybrid RAG with TypeSense (Search Systems)</li>
    </ol>

    <h2 class="display-6 my-5">Technical Requirements</h2>
    <ul>
      <li><strong>Python 3.11+</strong> recommended for all Python-based questions</li>
      <li><strong>Docker</strong> required for Q7 (TypeSense deployment)</li>
      <li><strong>Git & GitHub</strong> required for Q5</li>
      <li><strong>Unix Shell</strong> for Q3</li>
      <li><strong>API Deployment Service</strong> for Q2, Q4, Q7 (free tier acceptable: Render, Railway, Fly.io, etc.)</li>
    </ul>

    <h2 class="display-6 my-5">Scoring</h2>
    <p>Total weight: 16 points across 7 questions (weights: 2.0, 2.5, 2.0, 2.5, 2.0, 2.0, 3.0)</p>
  `,
};
