import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-column-validate";
  const title = "Validate CSV Column Types";

  // Sample CSV input (rows as string)
  const csvContent = `id,name,age,salary
1,Alice,30,55000
2,Bob,twenty-five,48000
3,Charlie,40,not_available
4,David,35,62000
5,Eve,thirty,50000`;

  // Convert CSV string to array of objects
  const rows = csvContent.split("\n").slice(1).map(line => {
    const [id, name, age, salary] = line.split(",");
    return { id, name, age, salary };
  });

  // Define the validation function
  const answer = async (value) => {
    // Expecting JSON string of invalid row indices
    let parsed;
    try { parsed = JSON.parse(value); } 
    catch { throw new Error("Enter a valid JSON array."); }

    // Identify rows with type errors
    const invalidRows = rows
      .map((row, idx) => {
        const ageValid = /^\d+$/.test(row.age);
        const salaryValid = /^\d+$/.test(row.salary);
        return !(ageValid && salaryValid) ? idx + 1 : null;
      })
      .filter(x => x !== null);

    if (JSON.stringify(invalidRows) !== JSON.stringify(parsed)) {
      throw new Error(`Incorrect. Invalid row indices: ${invalidRows}`);
    }
    return true;
  };

  // Blob for download
  const blob = new Blob([csvContent], { type: "text/csv" });

  const question = html`
    <div class="mb-3">
      <h2>Validate CSV Column Types</h2>
      <p>
        You are given a CSV dataset with some rows containing incorrect types for <code>age</code> and <code>salary</code>. 
        Identify all rows where the values are not numeric.
      </p>
      <p>
        Download the CSV file: 
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        Enter a JSON array of row numbers (starting at 1) that have invalid data.
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Example: [2,3,5]</p>
    </div>
  `;

  return { id, title, weight, question, answer };
};
