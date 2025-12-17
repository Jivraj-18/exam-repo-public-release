export default {
  title: "TDS Bonus Activity – Term 3 (2025)",
  start: "2025-12-19T00:00:00+05:30",
  end: () => "2025-12-26T23:59:59+05:30",
  allowed: (email) => email.endsWith("@study.iitm.ac.in"),
  read: () => true,
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
    <h1 class="display-3 my-5">TDS Bonus Activity – Term 3 (2025)</h1>
    
    <h2 class="display-6 my-5">Overview</h2>
    <p>This bonus activity tests practical, real-world data science and tooling skills. All 5 questions are auto-evaluated and focus on modern tools and techniques:</p>
    <ul>
      <li><strong>Prompt Engineering</strong>: Designing effective LLM prompts with proper structure</li>
      <li><strong>LLM Evaluation</strong>: Configuring automated evaluation frameworks</li>
      <li><strong>Web Data Extraction</strong>: Analyzing crawled web content</li>
      <li><strong>Analytical SQL</strong>: Business intelligence queries with DuckDB</li>
      <li><strong>LLM API Integration</strong>: Structured API responses and JSON validation</li>
    </ul>
    
    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li><strong>Read carefully</strong>. Each question includes sample data and expected output format.</li>
      <li><strong>Use resources</strong>. Documentation, internet search, AI tools - whatever you need.</li>
      <li><strong>Follow formats strictly</strong>. Answers are auto-checked - format matters!</li>
      <li><strong>No explanations unless asked</strong>. Provide only the answer.</li>
      <li><strong>Save often</strong>. Answers are stored locally in your browser - reloading is safe.</li>
      <li><strong>Check multiple times</strong>. Press Check to see which parts are correct or incorrect.</li>
    </ol>
    
    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li><strong>Learn what you need</strong>. Reading material and sample data are provided.</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd>. It shows which answers are right or wrong.</li>
      <li><strong>Use anything</strong>. The internet, ChatGPT, friends, documentation - whatever helps.</li>
    </ol>
    
    <h2 class="display-6 my-5">Questions Included (Total: 7.0 marks)</h2>
    <ol>
      <li>Context Engineering: Markdown Prompt Structure (Weight: 1)</li>
      <li>PromptFoo: LLM Evaluation Configuration (Weight: 1)</li>
      <li>Advanced HTML Crawl Analysis (Weight: 2)</li>
      <li>DuckDB: Marketing Saturation Analysis (Weight: 1.5)</li>
      <li>LLM Intent Classification: JSON Response (Weight: 1.5)</li>
    </ol>
  `,
};