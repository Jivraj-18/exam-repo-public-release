export default {
  title: "TDS 2025 Sep Bonus Activity – Student Contributed Questions",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  // Access rules
  allowed: () => true,
  read: () => true,

  admin: (email) =>
    email === "anand@study.iitm.ac.in" ||
    email === "prasanna@study.iitm.ac.in" ||
    email === "jkm@study.iitm.ac.in" ||
    email === "narayanan@study.iitm.ac.in",

  instructions: /* html */ `
    <h1 class="display-4 my-4">
      TDS 2025 Sep – Bonus Activity (Student Questions)
    </h1>

    <p>
      This exam contains <strong>student-authored questions</strong> designed
      to assess deep, real-world understanding of Tools in Data Science.
    </p>

    <h3>Rules</h3>
    <ol>
      <li>Use any tools you like: Internet, AI tools, CLI, spreadsheets.</li>
      <li>Focus on correctness and reasoning, not shortcuts.</li>
      <li>Some questions require hands-on execution.</li>
    </ol>

    <h3>Topics Covered</h3>
    <ul>
      <li>FastAPI & API Guardrails</li>
      <li>Spreadsheet-based Web Scraping</li>
      <li>Data Preparation & JSON Reasoning</li>
      <li>AI Coding Agents & Trace Analysis</li>
      <li>Prompt Injection & AI Safety</li>
    </ul>

    <p class="mt-4">
      These questions may be reused in future graded assignments.
    </p>
  `,
};
