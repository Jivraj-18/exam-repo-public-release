import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-data-cleaning";
  const title = "CSV Data Cleaning: Missing Values";

  const random = seedrandom(`${user.email}#${id}`);

  const employees = [
    "Emma Johnson",
    "Liam Smith",
    "Olivia Brown",
    "Noah Davis",
    "Ava Wilson",
    "William Moore",
    "Sophia Taylor",
    "James Anderson",
  ];
  const departments = ["Sales", "Engineering", "Marketing", "HR", "Finance"];

  const rows = [["employee_name", "department", "salary", "years_experience"]];

  let validCount = 0;
  const minYears = Math.floor(random() * 3) + 2; // 2-4 years

  // Generate 60 employee records, some with missing data
  for (let i = 0; i < 60; i++) {
    const name = employees[Math.floor(random() * employees.length)];
    const dept = random() < 0.15 ? "" : departments[Math.floor(random() * departments.length)]; // 15% missing
    const salary = random() < 0.1 ? "" : Math.floor(random() * 80000) + 40000; // 10% missing
    const years = random() < 0.12 ? "" : Math.floor(random() * 15) + 1; // 12% missing

    rows.push([name, dept, salary, years]);

    // Count valid rows with years >= minYears and no missing values
    if (dept !== "" && salary !== "" && years !== "" && years >= minYears) {
      validCount++;
    }
  }

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = (input) => {
    const value = parseInt(input.trim());
    if (Number.isNaN(value)) {
      throw new Error("Please enter a valid integer count.");
    }
    if (value !== validCount) {
      throw new Error(
        `Incorrect count. Remove rows with ANY missing values (empty cells), then filter for years_experience >= ${minYears}.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Data Cleaning: Employee Records</h2>
      <p>
        You're preparing employee data for analysis. The dataset has missing values that must be cleaned before
        filtering.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>employee_name</code>: Full name</li>
        <li><code>department</code>: Department name (may be missing)</li>
        <li><code>salary</code>: Annual salary in USD (may be missing)</li>
        <li><code>years_experience</code>: Years of experience (may be missing)</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load the CSV into Pandas or Excel.</li>
        <li><strong>Remove all rows with ANY missing values</strong> (empty cells in any column).</li>
        <li>
          From the cleaned data, count how many employees have
          <code>years_experience >= ${minYears}</code>.
        </li>
        <li>Enter the count below.</li>
      </ol>

      <p>
        Download the employee data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many complete records have years_experience >= ${minYears}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 23" required />
      <p class="text-muted">
        Use <code>dropna()</code> in Pandas to remove rows with missing values, then filter and count.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended Python workflow:

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd

df = pd.read_csv("q-csv-data-cleaning.csv")
# Remove rows with any missing values
df_clean = df.dropna()
# Convert years_experience to numeric (in case it's read as string)
df_clean['years_experience'] = pd.to_numeric(df_clean['years_experience'])
# Filter and count
count = len(df_clean[df_clean['years_experience'] >= MIN_YEARS])
print(count)

*/
