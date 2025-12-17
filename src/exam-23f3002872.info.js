export default {
  title: "TDS Bonus Activity – Student-Created Questions (23f3002872)",

  start: "2025-09-01T00:00:00+05:30",
  end: "2025-12-31T23:59:59+05:30",

  allowed: () => true,
  read: () => true,

  admin: (email) =>
    email === "23f3002872@ds.study.iitm.ac.in",

  instructions: /* html */ `
    <h1>Bonus Activity – New Question Set</h1>

    <p>
      This exam contains <strong>five original questions</strong> created as part of the
      Tools in Data Science bonus activity.
    </p>

    <h2>Topics Covered</h2>
    <ul>
      <li>Data Cleaning and Validation</li>
      <li>HTTP Headers and Debugging</li>
      <li>Advanced JSON Transformation</li>
      <li>Git History Analysis</li>
      <li>Data Visualization Debugging</li>
    </ul>

    <h2>Instructions</h2>
    <ol>
      <li>Answer each question carefully.</li>
      <li>Use any resources you want.</li>
      <li>You may check answers multiple times.</li>
    </ol>
  `,
};
