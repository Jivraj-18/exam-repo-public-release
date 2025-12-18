export default {
  id: "exam-tds-2025-bonus-activity",
  slug: "tds-bonus",
  title: "TDS 2025 Bonus Activity",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  allowed: () => true, // Allow all logged-in users
  read: () => true,    // Allow public read-only access

  admin: (email) =>
    email === "22f3001919@ds.study.iitm.ac.in" || // Carlton D'Silva
    email === "prasanna@study.iitm.ac.in" ||     // Prasanna S
    email === "22f3002542@ds.study.iitm.ac.in" || // Jivraj Singh Shekhawat
    email === "22f3002460@ds.study.iitm.ac.in" || // Hritik Roshan Maurya
    email === "jkm@study.iitm.ac.in" ||           // Jayakrishnan Warriem
    email === "narayanan@study.iitm.ac.in" ||     // Narayanan R
    email === "sivaadithya@study.iitm.ac.in" ||   // Sivaadithya M
    email === "anand@study.iitm.ac.in",           // Anand S

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Bonus Activity
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This bonus activity evaluates practical skills from the
      <strong>Tools in Data Science</strong> course through
      hands-on, real-world tasks.
    </p>

    <h2 class="display-6 my-5">Topics Covered</h2>
    <ul>
      <li><strong>Web & API Automation</strong>: Searching Hacker News via RSS</li>
      <li><strong>Large Language Models</strong>: Sentiment analysis using AI Pipe</li>
      <li><strong>Data Cleaning</strong>: Entity resolution using OpenRefine</li>
      <li><strong>Geospatial Analysis</strong>: Coverage gap analysis using Excel maps</li>
      <li><strong>Data Storytelling</strong>: Creating narratives with LLM assistance</li>
    </ul>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>Answer all questions carefully.</li>
      <li>Follow the output format specified in each question.</li>
      <li>You may use any tools or resources unless stated otherwise.</li>
      <li>Answers are auto-evaluated where possible; formatting matters.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Search Hacker News for a Docker post with minimum points</li>
      <li>LLM-based sentiment analysis using AI Pipe</li>
      <li>Supplier entity resolution and spend normalization in OpenRefine</li>
      <li>Excel geospatial coverage gap analysis</li>
      <li>Data storytelling using Large Language Models</li>
    </ol>
  `,
};
