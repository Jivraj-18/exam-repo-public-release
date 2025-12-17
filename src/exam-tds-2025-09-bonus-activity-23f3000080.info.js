export default {
  title: "TDS 2025 Sep Bonus Activity – 23f3000080",

  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  allowed: () => true,
  read: () => true,

  admin: (email) =>
    email.endsWith("@ds.study.iitm.ac.in"),

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity
    </h1>

    <p>
      This exam contains <strong>5 original questions</strong> created as part of
      the Tools in Data Science bonus assignment.
    </p>

    <ul>
      <li>Python Data Analysis</li>
      <li>Excel & Spreadsheets</li>
      <li>REST APIs</li>
      <li>Text Processing</li>
      <li>Data Visualization</li>
    </ul>

    <p>
      All questions are original and aligned with the TDS syllabus.
    </p>
  `,
};
