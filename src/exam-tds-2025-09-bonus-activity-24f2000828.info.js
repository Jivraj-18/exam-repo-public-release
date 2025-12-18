export default {
  title: "TDS 2025 Sep Bonus Activity - 24f2000828",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
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
    || email == "24f2000828@ds.study.iitm.ac.in", // Devam Shah (Created this assignment)
  instructions: /* html */ `
    <h1 class="display-3 my-5">Comprehensive Assignment</h1>
    <p class="lead">Curated by Devam Shah (24f2000828)</p>

    <div class="card bg-dark mb-4">
      <div class="card-body">
        <h2 class="h4">Topics Covered:</h2>
        <ul>
          <li><strong>SQLite & Shell:</strong> Forensic log auditing.</li>
          <li><strong>CI/CD:</strong> Automated Vercel deployments with GitHub Actions.</li>
          <li><strong>Multimodal AI:</strong> Vision-based scraping and semantic drift analysis.</li>
          <li><strong>Forensics:</strong> Base64 decoding and geospatial filtering.</li>
        </ul>
      </div>
    </div>

    <h2 class="display-6 my-4">How to Use</h2>
    <ol>
      <li>Download the datasets provided in specific questions.</li>
      <li>Use <code>Python/Pandas</code>, <code>SQLite</code>, or <code>Node.js</code> as instructed.</li>
      <li>For Vercel tasks, ensure your endpoints are public and CORS-enabled.</li>
      <li>You may use LLMs or any external tools to solve these challenges.</li>
    </ol>
  `,
};

// https://github.com/Jivraj-18/exam-repo-public-release
