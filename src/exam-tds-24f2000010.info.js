export default {
  title: "TDS 2025 Sep Bonus Activity - 24f2000010",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: (email) => email == "24f2000010@ds.study.iitm.ac.in",
  read: () => true,
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity - 24f2000010
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This exam focuses on applied data handling tasks involving logs,
      APIs, text normalization, joins, and statistical reasoning.
    </p>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>Download the dataset provided for each question.</li>
      <li>Process the data programmatically.</li>
      <li>Compute the required numeric result.</li>
      <li>Submit the answer and verify.</li>
    </ol>

    <h2 class="display-6 my-5">Question Themes</h2>
    <ol>
      <li>Log Analysis – Severity aggregation</li>
      <li>API Aggregation – Batched responses</li>
      <li>Text Cleansing – Normalization and filtering</li>
      <li>Data Joining – Foreign-key style joins</li>
      <li>Statistics – Percentiles and rolling windows</li>
    </ol>
  `,
};