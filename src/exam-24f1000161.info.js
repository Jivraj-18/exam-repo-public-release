export default {
  // Basic exam settings
  title: "TDS Bonus Activity - Advanced Practice",
  start: "2024-12-18T00:00:00+05:30",
  hours: 10.0, // 10 hours for nightmare-level multi-module integration problems

  // Access control
  admin: (email) => email == "admin@example.com",
  allowed: (email) => email.endsWith("@study.iitm.ac.in") || email.endsWith("@ds.study.iitm.ac.in"),

  // Pre-exam display
  instructions: /* html */ `
    <h1 class="display-3 my-5">TDS Bonus Activity - Advanced Practice</h1>

    <h2 class="display-6 my-4">Overview</h2>
    <p>
      This exam contains <strong>11 questions (48 marks)</strong> covering all 8 modules of Tools in Data Science:
    </p>
    <ul>
      <li><strong>Module 1 - Development Tools</strong>: Regex, Git, CSS selectors, async Python</li>
      <li><strong>Module 2 - Deployment Tools</strong>: Vercel serverless, CORS, API design</li>
      <li><strong>Module 3 - AI Coding</strong>: Pydantic AI, prompt engineering, LLM agents</li>
      <li><strong>Module 4 - Large Language Models</strong>: Embeddings, RAG, function calling, vector databases</li>
      <li><strong>Module 5 - Data Sourcing</strong>: Web scraping, BeautifulSoup, APIs, pagination</li>
      <li><strong>Module 6 - Data Preparation</strong>: Pandas transformations, DuckDB, data cleaning</li>
      <li><strong>Module 7 - Data Analysis</strong>: DuckDB analytics, geospatial analysis, Haversine formula</li>
      <li><strong>Module 8 - Data Visualization</strong>: RevealJS presentations, data storytelling</li>
    </ul>

    <h3>Integrated Module Approach</h3>
    <p>
      Questions 6-11 test <strong>multiple modules together</strong>, reflecting real-world scenarios where you combine:
    </p>
    <ul>
      <li>Deployment + Scraping (Modules 2+5)</li>
      <li>AI Coding + LLM Agents (Modules 3+4)</li>
      <li>Embeddings + Data Prep (Modules 4+6)</li>
      <li>Scraping + Pandas (Modules 5+6)</li>
      <li>DuckDB + Geospatial (Modules 6+7)</li>
      <li>Data Visualization + Storytelling (Module 8)</li>
    </ul>

    <h2 class="display-6 my-4">Scoring</h2>
    <ul>
      <li><strong>Total Points</strong>: 48 marks</li>
      <li><strong>Time Limit</strong>: 10 hours</li>
      <li><strong>Evaluation</strong>: Automated validation and code review</li>
      <li><strong>Partial Credit</strong>: Available for correct approaches</li>
    </ul>

    <h2 class="display-6 my-4">Rules</h2>
    <ol>
      <li><strong>All resources allowed</strong>: Use any documentation, tools, or references</li>
      <li><strong>Original work required</strong>: Solutions will be verified for authenticity</li>
      <li><strong>Validation required</strong>: Test your solutions before submission</li>
      <li><strong>Documentation encouraged</strong>: Comment your code for clarity</li>
    </ol>

    <h2 class="display-6 my-4">Guidelines</h2>
    <ul>
      <li>Read each requirement carefully</li>
      <li>Test incrementally as you build your solution</li>
      <li>Use debugging tools to verify your logic</li>
      <li>Refer to validation commands for expected output format</li>
    </ul>

    <h2 class="display-6 my-4">Technical Requirements</h2>
    <ul>
      <li><strong>Python</strong>: 3.10+ with uv/pip for package management</li>
      <li><strong>Node.js</strong>: 18+ for serverless functions</li>
      <li><strong>Vercel CLI</strong>: <code>npm install -g vercel</code></li>
      <li><strong>Git</strong>: Version 2.30+ for cryptographic operations</li>
      <li><strong>DuckDB</strong>: <code>pip install duckdb</code> for SQL analytics</li>
      <li><strong>Libraries</strong>: beautifulsoup4, pandas, chromadb, pydantic-ai, sentence-transformers</li>
    </ul>

    <h2 class="display-6 my-4">Why Integrated Questions?</h2>
    <p>
      Real-world data science projects require combining multiple tools:
    </p>
    <ul>
      <li>Scraping + Deployment: Build production-ready data pipelines</li>
      <li>LLMs + AI Tools: Leverage AI coding assistants for agent development</li>
      <li>Embeddings + Data Prep: Create RAG systems with clean, structured data</li>
      <li>Analysis + Visualization: Communicate insights through interactive presentations</li>
    </ul>

    <h2 class="display-6 my-4">Instructions</h2>
    <p>
      Apply your Tools in Data Science knowledge to solve each problem. 
      Focus on correctness, proper tool integration, and handling edge cases.
    </p>
  `,
};
