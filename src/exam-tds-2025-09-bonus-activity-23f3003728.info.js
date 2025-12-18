export default {
  title: "TDS 2025 Sep Bonus Activity - 23f3003728",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2026-12-31T23:59:59+05:30",
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
      TDS 2025 Sep Bonus Activity
    </h1>
    <p class="lead">Roll Number: 23f3003728</p>
    <h2>5 Questions</h2>
    <ul>
      <li><strong>Q1:</strong> OpenLibrary API - Book Data Aggregation (GA5)</li>
      <li><strong>Q2:</strong> arXiv API - Research Paper Analysis (GA5)</li>
      <li><strong>Q3:</strong> LLM Token Cost Calculator (GA4)</li>
      <li><strong>Q4:</strong> Embedding Duplicate Detection (GA4)</li>
      <li><strong>Q5:</strong> Marimo Reactive Dashboard (GA8)</li>
    </ul>
  `,
};

