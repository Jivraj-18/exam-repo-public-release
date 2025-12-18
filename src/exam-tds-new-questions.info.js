export default {
  title: "TDS New Questions",
  start: "2025-01-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true,
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
    <h1 class="display-3 my-5">TDS Advanced Scenarios</h1>
    <h2 class="display-6 my-5">Overview</h2>
    <p>This assessment contains 10 advanced, scenario-based questions designed to test your ability to apply data science tools in realistic, "messy" industry contexts.</p>
    
    <h2 class="display-6 my-5">Topics Covered</h2>
    <ul>
      <li><strong>Deployment</strong>: Docker layer optimization, Serverless latency analysis.</li>
      <li><strong>Data Sourcing</strong>: Handling flaky APIs, Decoding binary streams.</li>
      <li><strong>Data Preparation</strong>: recovering data from corrupted logs.</li>
      <li><strong>Analysis</strong>: Anomaly detection, Geospatial logic without GIS libs.</li>
      <li><strong>AI & LLMs</strong>: Prompt engineering for JSON, Vector similarity math.</li>
    </ul>

    <p>Good luck!</p>
  `,
};