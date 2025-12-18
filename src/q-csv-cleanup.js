import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-cleanup";
  const title = "CSV Parsing: Convert CSV to JSON Endpoint";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate random CSV data
  const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Support", "Research"];

  // Generate random number of rows (3-6)
  const numRows = 3 + Math.floor(random() * 4);

  // Generate headers and rows
  const headers = ["name", "city", "department", "age"];
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push({
      name: `${pick(firstNames)} ${pick(lastNames)}`,
      city: pick(cities),
      department: pick(departments),
      age: String(22 + Math.floor(random() * 40)),
    });
  }

  // Create CSV string
  const csvHeader = headers.join(",");
  const csvRows = rows.map((row) => headers.map((h) => row[h]).join(","));
  const csvData = [csvHeader, ...csvRows].join("\n");

  // Expected JSON output
  const expectedRows = rows;

  const answer = async (url) => {
    url = url.trim();
    if (!url) throw new Error("Please provide the URL of your /parse-csv endpoint");

    const baseUrl = url.replace(/\/$/, "");
    const endpoint = `${baseUrl}/parse-csv`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv_data: csvData }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Check if rows field exists
    if (!result.rows || !Array.isArray(result.rows)) {
      throw new Error("Response must contain a 'rows' array");
    }

    if (result.rows.length !== expectedRows.length) {
      throw new Error(`Expected ${expectedRows.length} rows, got ${result.rows.length}`);
    }

    // Validate each row
    for (let i = 0; i < expectedRows.length; i++) {
      const expected = expectedRows[i];
      const actual = result.rows[i];

      for (const key of headers) {
        if (String(actual[key]).trim() !== String(expected[key]).trim()) {
          throw new Error(
            `Row ${i + 1}: Expected ${key}="${expected[key]}", got "${actual[key]}"`
          );
        }
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>CSV to JSON Parser API</h2>
      <p>
        <strong>DataBridge Solutions</strong> needs an API endpoint that converts CSV data into structured JSON format.
        This is a common requirement for data integration pipelines.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          Create a <strong>POST</strong> endpoint at <code>/parse-csv</code>
        </li>
        <li>
          Accept JSON body: <code>{"csv_data": "header1,header2\\nval1,val2\\n..."}</code>
        </li>
        <li>
          Parse the CSV string where:
          <ul>
            <li>First line contains column headers</li>
            <li>Subsequent lines contain data values</li>
            <li>Fields are comma-separated</li>
          </ul>
        </li>
        <li>
          Return JSON: <code>{"rows": [{header1: "val1", header2: "val2"}, ...]}</code>
        </li>
      </ol>

      <h3>Test CSV Data</h3>
      <pre style="white-space: pre-wrap;"><code>${csvData}</code></pre>

      <h3>Expected Output Structure</h3>
      <pre><code class="language-json">{
  "rows": [
    {"name": "...", "city": "...", "department": "...", "age": "..."},
    ...
  ]
}</code></pre>

      <h3>Implementation Hint</h3>
      <p>In Python, you can use the <code>csv</code> module:</p>
      <pre><code class="language-python">import csv
import io

reader = csv.DictReader(io.StringIO(csv_data))
rows = [dict(row) for row in reader]</code></pre>

      <label for="${id}" class="form-label">Enter your API base URL (e.g., https://your-server.com):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://your-api-url.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
