import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-cleaning-lossless";
  const title = "Clean a malformed CSV";

  const rawCSV = `id,name,age,city
1,"Alice, A.",23,Delhi
2,Bob,,Mumbai
3,Charlie,29
4,"Dana",27,Bangalore,Extra`;

  const expected = [
    ["1", "Alice, A.", "23", "Delhi"],
    ["2", "Bob", "NULL", "Mumbai"],
    ["3", "Charlie", "29", "NULL"],
    ["4", "Dana", "27", "Bangalore"],
  ];

  const answer = async () => {
    const file = document.getElementById(id).files[0];
    if (!file) throw new Error("No file uploaded");

    const text = await file.text();
    const rows = text.trim().split("\n").slice(1);

    const parsed = rows.map(r => r.split(",").map(v => v.replace(/^"|"$/g, "")));

    if (parsed.length !== expected.length) {
      throw new Error("Row count mismatch");
    }

    parsed.forEach((row, i) => {
      expected[i].forEach((val, j) => {
        if (row[j] !== val) {
          throw new Error(`Row ${i + 1} column ${j + 1} incorrect`);
        }
      });
    });

    return true;
  };

  const question = html`
    <p><strong>Case Study: Data Ingestion Pipeline</strong></p>
    <p>
      You are given a malformed CSV file. Clean it such that:
    </p>
    <ul>
      <li>Missing values are replaced with <code>NULL</code></li>
      <li>Extra columns are removed</li>
      <li>Quoted commas are preserved</li>
    </ul>
    <pre>${rawCSV}</pre>
    <label class="form-label">Upload the cleaned CSV file</label>
    <input class="form-control" id="${id}" type="file" accept=".csv" />
  `;

  return { id, title, weight, question, answer };
}
