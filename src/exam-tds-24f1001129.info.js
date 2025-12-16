export default {
  title: "TDS 2025 Sep Bonus Activity - 24f1001129",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: (email) => email == "24f1001129@ds.study.iitm.ac.in",
  read: () => true,
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity - 24f1001129
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This exam contains five applied data engineering and data analysis questions.
      The focus is on working with realistic datasets involving APIs, scraping,
      cleansing, processing, and analytical reasoning.
    </p>

    <h2 class="display-6 my-5">How to Use This Assignment</h2>
    <ol>
      <li>Read each question carefully.</li>
      <li>Download the provided data file for each question.</li>
      <li>Use Python (or any language) to process the data.</li>
      <li>Compute the required numeric answer.</li>
      <li>Use <kbd>Check</kbd> to validate your response.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Web Scraping – Pagination and multi-page aggregation</li>
      <li>API Sourcing – Nested JSON and time-series extraction</li>
      <li>Data Cleansing – CSV cleaning and invalid record removal</li>
      <li>Data Processing – Base64 decoding and date normalization</li>
      <li>Analysis & Visualization – Percentiles and trimmed statistics</li>
    </ol>
  `,
};