export default {
  title: "TDS Bonus Activity (23f3001608)",
  start: "2025-12-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true,
  read: () => true,
  admin: (email) => email.endsWith("@study.iitm.ac.in"),
  instructions: /* html */ `
    <h1 class="display-4 my-5">TDS Bonus Activity (23f3001608)</h1>
    <p>
      Answer each question using any tools you like (Python, jq, Excel, etc.). Enter only the final value/JSON in the
      input box.
    </p>
    <ol>
      <li>CSV  JSON cleaning and type casting</li>
      <li>Regex log parsing and p95 latency</li>
      <li>JSONL sessionization (30-minute gap rule)</li>
      <li>Pandas rolling KPI (7-day inclusive window)</li>
      <li>Bonus twist question</li>
    </ol>
  `,
};
