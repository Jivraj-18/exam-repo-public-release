import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-csv-to-json-transform";
    const title = "Transform CSV to Nested JSON";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    // Generate departments and employees
    const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
    const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Moore"];

    // Select 3-4 departments randomly
    const numDepts = 3 + Math.floor(random() * 2);
    const selectedDepts = [];
    const deptsCopy = [...departments];
    for (let i = 0; i < numDepts; i++) {
        const idx = Math.floor(random() * deptsCopy.length);
        selectedDepts.push(deptsCopy.splice(idx, 1)[0]);
    }

    // Generate employees
    const employees = [];
    const usedNames = new Set();

    for (const dept of selectedDepts) {
        const numEmps = 2 + Math.floor(random() * 3); // 2-4 employees per dept
        for (let i = 0; i < numEmps; i++) {
            let name;
            do {
                name = `${pick(firstNames)} ${pick(lastNames)}`;
            } while (usedNames.has(name));
            usedNames.add(name);

            const salary = Math.floor(50000 + random() * 100000);
            employees.push({ name, department: dept, salary });
        }
    }

    // Create CSV content
    const csvRows = [["name", "department", "salary"]];
    employees.forEach(emp => {
        csvRows.push([emp.name, emp.department, emp.salary]);
    });
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Expected JSON output: group by department
    const grouped = {};
    employees.forEach(emp => {
        if (!grouped[emp.department]) {
            grouped[emp.department] = { department: emp.department, employees: [], totalSalary: 0 };
        }
        grouped[emp.department].employees.push({ name: emp.name, salary: emp.salary });
        grouped[emp.department].totalSalary += emp.salary;
    });

    const expectedJson = Object.values(grouped)
        .sort((a, b) => a.department.localeCompare(b.department))
        .map(dept => ({
            department: dept.department,
            employees: dept.employees.sort((a, b) => a.name.localeCompare(b.name)),
            totalSalary: dept.totalSalary
        }));

    const answer = (input) => {
        let parsed;
        try {
            parsed = JSON.parse(input);
        } catch (e) {
            throw new Error("Invalid JSON. Please check your syntax.");
        }

        if (!Array.isArray(parsed)) {
            throw new Error("Expected a JSON array of department objects.");
        }

        if (parsed.length !== expectedJson.length) {
            throw new Error(`Expected ${expectedJson.length} departments, got ${parsed.length}.`);
        }

        // Sort and compare
        const sortedParsed = [...parsed].sort((a, b) => a.department.localeCompare(b.department));

        for (let i = 0; i < expectedJson.length; i++) {
            const exp = expectedJson[i];
            const got = sortedParsed[i];

            if (got.department !== exp.department) {
                throw new Error(`Department mismatch: expected ${exp.department}, got ${got.department}`);
            }
            if (got.totalSalary !== exp.totalSalary) {
                throw new Error(`Total salary mismatch for ${exp.department}: expected ${exp.totalSalary}, got ${got.totalSalary}`);
            }
            if (!got.employees || got.employees.length !== exp.employees.length) {
                throw new Error(`Employee count mismatch for ${exp.department}`);
            }

            const sortedGotEmps = [...got.employees].sort((a, b) => a.name.localeCompare(b.name));
            for (let j = 0; j < exp.employees.length; j++) {
                if (sortedGotEmps[j].name !== exp.employees[j].name || sortedGotEmps[j].salary !== exp.employees[j].salary) {
                    throw new Error(`Employee data mismatch in ${exp.department}`);
                }
            }
        }

        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>DataFlow Corp: CSV to JSON Transformation</h2>
      <p>
        <strong>DataFlow Corp</strong> is building a new HR analytics dashboard. They need to transform
        flat CSV employee data into a nested JSON structure grouped by department for their API.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Download the CSV file containing employee records.</li>
        <li>Group employees by their <code>department</code>.</li>
        <li>For each department, create an object with:
          <ul>
            <li><code>department</code>: The department name</li>
            <li><code>employees</code>: Array of {name, salary} objects</li>
            <li><code>totalSalary</code>: Sum of all salaries in that department</li>
          </ul>
        </li>
        <li>Return a JSON array sorted by department name (A→Z).</li>
        <li>Within each department, sort employees by name (A→Z).</li>
      </ol>

      <h3>Example Output Structure</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code>[
  {
    "department": "Engineering",
    "employees": [{"name": "Alice", "salary": 75000}, ...],
    "totalSalary": 250000
  },
  ...
]</code></pre>

      <p>
        Download the employee data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">Paste the transformed JSON:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10" required></textarea>
    </div>
  `;

    return { id, title, weight, question, answer };
}

/* Solution

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd
import json

df = pd.read_csv("q-csv-to-json-transform.csv")

result = []
for dept in sorted(df['department'].unique()):
    dept_df = df[df['department'] == dept].sort_values('name')
    employees = [{"name": row['name'], "salary": int(row['salary'])} for _, row in dept_df.iterrows()]
    result.append({
        "department": dept,
        "employees": employees,
        "totalSalary": int(dept_df['salary'].sum())
    })

print(json.dumps(result))

*/
