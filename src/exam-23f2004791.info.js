export default {
  title: "TDS Exam - 23F2004791 Custom Set",
  start: "2025-01-01T00:00:00+05:30",
  end: "2025-12-31T23:59:59+05:30",
  hours: 2,
  allowed: () => true,
  read: () => true,
  admin: (email) => email?.endsWith("@study.iitm.ac.in") || email?.endsWith("@ds.study.iitm.ac.in"),
  instructions: /* html */ `
    <h1 class="display-5 my-4">TDS Custom Exam (23F2004791)</h1>
    <p>This exam contains five questions aligned with the Tools in Data Science syllabus. You may use any resources.</p>
    <h3 class="mt-4">Included Questions</h3>
    <ol>
      <li>Playwright: Scrape a JS-rendered site</li>
      <li>DuckDB: Transform nested JSON</li>
      <li>FastAPI: CSV upload and summary</li>
      <li>Seaborn: Faceted visualization</li>
      <li>LLM: Structured product data extraction</li>
    </ol>
    <p class="mt-3">Press <kbd>Check</kbd> to validate each answer. You can retry until correct.</p>
  `,
};
