export default {
  title: "TDS 2025 Sep Bonus Activity – Student-Created Questions",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  // Access control
  allowed: () => true, // Allow all logged-in users
  read: () => true,    // Allow read-only access for others

  // Admin access (course staff)
  admin: (email) =>
    email == "prasanna@study.iitm.ac.in" ||
    email == "jkm@study.iitm.ac.in" ||
    email == "narayanan@study.iitm.ac.in" ||
    email == "anand@study.iitm.ac.in" ||
    email == "22f3002542@ds.study.iitm.ac.in", // Jivraj Singh Shekhawat

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity – Student-Created Questions
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This assignment contains a curated set of <strong>five original questions</strong>
      created as part of the Tools in Data Science (TDS) bonus activity.
      The goal is to design realistic, exam-quality questions that reflect
      practical skills taught in the course and can be reused in future graded assignments.
    </p>

    <h2 class="display-6 my-5">Topics Covered</h2>
    <ul>
      <li><strong>LLMs & Streaming</strong>: Understanding Server-Sent Events (SSE)</li>
      <li><strong>Reactive Notebooks</strong>: Dependency tracking in Marimo</li>
      <li><strong>SQL Analytics</strong>: Rolling averages and conversion lift analysis</li>
      <li><strong>DuckDB & JSON</strong>: Log analysis using JSON functions</li>
      <li><strong>Data Sourcing</strong>: Extracting structured web data using Google Sheets</li>
    </ul>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>
        <strong>Learn what you need</strong>.
        Reading material may be provided inside questions, but you may skip it
        if you already know the topic.
      </li>
      <li>
        <strong>Check answers regularly</strong> using the <kbd>Check</kbd> button.
        You can check multiple times.
      </li>
      <li>
        <strong>Save frequently</strong>. Your last saved submission will be evaluated.
      </li>
      <li>
        <strong>Use anything you want</strong>.
        Internet, documentation, ChatGPT, or course notes are all allowed.
      </li>
      <li>
        <strong>This is intentionally hackable</strong>.
        Inspecting code and understanding how answers are validated is encouraged.
      </li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Understanding LLM Streaming with Server-Sent Events (SSE)</li>
      <li>Reactive Dependency Execution in Marimo Notebooks</li>
      <li>Rolling Conversion Lift Detection using SQL Window Functions</li>
      <li>API Error Rate Computation from JSON Logs using DuckDB</li>
      <li>Counting Structured Web Data using Google Sheets and IMPORTXML</li>
    </ol>

    <p class="mt-5">
      These questions are <strong>original</strong>, aligned with the TDS syllabus,
      and are designed to test both conceptual understanding and practical problem-solving skills.
    </p>
  `,
};
