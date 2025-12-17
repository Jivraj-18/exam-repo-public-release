import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function({ user, weight = 1 }) {
  const id = "q-duckdb-sla-breach";
  const title = "DuckDB: SLA Breach Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const numRequests = Math.floor(random() * 5) + 8;
  const requests = Array.from({ length: numRequests }, (_, i) => {
    const slaLimit = Math.floor(random() * 3) * 50 + 100;
    const responseTime = Math.floor(random() * 200) + 50;
    return {
      id: `REQ${String(i + 1).padStart(3, '0')}`,
      responseTime,
      slaLimit
    };
  });

  const question = html`
    <div class="mb-3">
      <h3>DuckDB: SLA Breach Analysis</h3>
      <p>Query a DuckDB table to find SLA breaches.</p>
      <p>Table: <code>requests</code></p>
      <pre>CREATE TABLE requests (
  request_id VARCHAR,
  response_time INTEGER,
  sla_limit INTEGER
);

INSERT INTO requests VALUES
${requests.map(r => `  ('${r.id}', ${r.responseTime}, ${r.slaLimit})`).join(",\n")};</pre>
      <p>Write a SQL query to find the request_id with the highest response_time that exceeds its SLA limit.</p>
      <label for="${id}" class="form-label">Request ID with highest SLA breach:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: { type: "text" },
  };
}
