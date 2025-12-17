import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-missing-values";
  const title = "Pandas: Handle Missing Values in Dataset";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate sample employee data with missing values
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
  const firstNames = ["Amit", "Priya", "Rahul", "Sneha", "Vikram", "Anita", "Rohan", "Kavita", "Suresh", "Meera"];
  const lastNames = ["Sharma", "Patel", "Kumar", "Singh", "Gupta", "Reddy", "Nair", "Joshi", "Rao", "Verma"];

  const numRecords = 40 + Math.floor(random() * 20);
  const employees = [];

  let missingDeptCount = 0;
  let missingSalaryCount = 0;
  let missingAgeCount = 0;

  for (let i = 0; i < numRecords; i++) {
    const firstName = firstNames[Math.floor(random() * firstNames.length)];
    const lastName = lastNames[Math.floor(random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    // Randomly make some fields missing (represented as empty strings)
    let department = departments[Math.floor(random() * departments.length)];
    let salary = 30000 + Math.floor(random() * 70000);
    let age = 22 + Math.floor(random() * 40);

    // 15% chance of missing department
    if (random() < 0.15) {
      department = "";
      missingDeptCount++;
    }

    // 20% chance of missing salary
    if (random() < 0.2) {
      salary = "";
      missingSalaryCount++;
    }

    // 10% chance of missing age
    if (random() < 0.1) {
      age = "";
      missingAgeCount++;
    }

    employees.push({ name, department, salary, age });
  }

  // Pick which column to ask about
  const columnOptions = [
    { column: "department", count: missingDeptCount },
    { column: "salary", count: missingSalaryCount },
    { column: "age", count: missingAgeCount },
  ];

  // Filter to columns that have at least 1 missing value
  const validOptions = columnOptions.filter((c) => c.count > 0);
  const targetColumn = validOptions.length > 0 
    ? validOptions[Math.floor(random() * validOptions.length)]
    : columnOptions[Math.floor(random() * columnOptions.length)];

  // Generate CSV content
  const csvHeader = "name,department,salary,age";
  const csvRows = employees.map((e) => `${e.name},${e.department},${e.salary},${e.age}`);
  const csvContent = [csvHeader, ...csvRows].join("\n");

  const question = html`
    <div class="mb-3">
      <h4>Pandas: Missing Value Analysis</h4>
      <p>
        You are cleaning an employee dataset that has some missing values (represented as empty cells in the CSV).
      </p>

      <pre
        style="max-height: 280px; overflow-y: auto; background: #f5f5f5; padding: 10px; font-size: 11px;"
      ><code>${csvContent}</code></pre>

      <p>
        <strong>Task:</strong> Using Python Pandas, load this CSV and count the number of
        <strong>missing values</strong> in the <code>${targetColumn.column}</code> column.
      </p>

      <p><strong>Hint:</strong> Empty strings in CSV are treated as empty when using proper null handling.</p>
      <pre><code>import pandas as pd
df = pd.read_csv('employees.csv', na_values=['', ' '])
# Count missing values in a column
missing_count = df['${targetColumn.column}'].isna().sum()</code></pre>

      <label for="${id}" class="form-label">
        How many missing values are in the <code>${targetColumn.column}</code> column?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  const answer = (input) => {
    if (!input || input.trim() === "") throw new Error("Answer is required");

    const userAnswer = parseInt(input, 10);
    if (isNaN(userAnswer)) throw new Error("Please enter a valid number");

    if (userAnswer !== targetColumn.count) {
      throw new Error(`Incorrect. Expected ${targetColumn.count} missing values in ${targetColumn.column}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
