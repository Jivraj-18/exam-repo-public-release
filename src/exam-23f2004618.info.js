export default {
  title: "TDS 2025 Sep Bonus Activity - New Question Set",
  start: "2025-12-16T00:00:00+05:30",
  end: "2025-12-18T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users
  read: () => true, // Allow all to read
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
      TDS 2025 Sep Bonus Activity - New Question Submission
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This is a set of 5 original questions covering diverse topics from the Tools in Data Science course:</p>
    <ul>
      <li><strong>DuckDB Data Analysis:</strong> Advanced SQL with Window Functions and CTEs</li>
      <li><strong>Git Workflow:</strong> Rebase strategies and conflict resolution</li>
      <li><strong>RAG Systems:</strong> Hybrid Search and Re-ranking architectures</li>
      <li><strong>Docker Compose:</strong> Production-ready microservices with healthchecks</li>
      <li><strong>Marp Presentations:</strong> Advanced CSS styling and layouts</li>
    </ul>

    <h2 class="display-6 my-5">Question Topics</h2>
    <p>These questions demonstrate understanding of key TDS concepts:</p>
    <ul>
      <li><strong>Data Analysis (GA7):</strong> Advanced SQL queries with DuckDB for business analytics</li>
      <li><strong>Development Tools (GA1):</strong> Version control with Git branches and merges</li>
      <li><strong>Large Language Models (GA4):</strong> Implementing RAG pipelines for document retrieval</li>
      <li><strong>Deployment Tools (GA2):</strong> Containerization with Docker Compose</li>
      <li><strong>Data Visualization (GA8):</strong> Technical presentations using Marp</li>
    </ul>

    <h2 class="display-6 my-5">Submission Details</h2>
    <p>
      These questions were created as part of the TDS Sep 2025 bonus activity to contribute 
      new assessment material for the course. Each question follows the standard format with:
    </p>
    <ul>
      <li>Real-world business case study context</li>
      <li>Clear technical requirements and specifications</li>
      <li>Step-by-step task instructions</li>
      <li>Helpful hints and documentation references</li>
      <li>Automated answer validation</li>
    </ul>

    <h2 class="display-6 my-5">How to Use</h2>
    <ol>
      <li><strong>Read the case study</strong> to understand the business context</li>
      <li><strong>Review the requirements</strong> and technical specifications</li>
      <li><strong>Complete the task</strong> using the tools and techniques from TDS</li>
      <li><strong>Check your answer</strong> by clicking the Check button</li>
      <li><strong>Iterate if needed</strong> - you can check multiple times</li>
    </ol>
  `,
};
