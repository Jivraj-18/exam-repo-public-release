import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-dept-salary";
  const title = "Data Aggregation: Department Salary Totals";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Define departments
  const departments = ["IT", "HR", "Sales", "Marketing", "Finance", "Operations"];

  // Generate random employees (8-15)
  const numEmployees = 8 + Math.floor(random() * 8);
  const employees = [];

  const firstNames = ["John", "Jane", "Mike", "Sarah", "Tom", "Lisa", "David", "Emma", "Chris", "Anna"];
  const lastNames = ["Smith", "Johnson", "Brown", "Wilson", "Taylor", "Anderson", "Thomas", "Moore", "Martin", "Lee"];

  for (let i = 0; i < numEmployees; i++) {
    employees.push({
      name: `${pick(firstNames)} ${pick(lastNames)}`,
      dept: pick(departments),
      salary: Math.round((30000 + random() * 70000) * 100) / 100,
    });
  }

  // Calculate expected totals
  const expectedTotals = {};
  for (const emp of employees) {
    if (!expectedTotals[emp.dept]) {
      expectedTotals[emp.dept] = 0;
    }
    expectedTotals[emp.dept] += emp.salary;
  }

  // Round to 2 decimal places
  for (const dept in expectedTotals) {
    expectedTotals[dept] = Math.round(expectedTotals[dept] * 100) / 100;
  }

  const answer = async (url) => {
    url = url.trim();
    if (!url) throw new Error("Please provide the URL of your /total-salary endpoint");

    const baseUrl = url.replace(/\/$/, "");
    const endpoint = `${baseUrl}/total-salary`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employees }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Check each department total
    const actualDepts = Object.keys(result);
    const expectedDepts = Object.keys(expectedTotals);

    if (actualDepts.length !== expectedDepts.length) {
      throw new Error(
        `Expected ${expectedDepts.length} departments, got ${actualDepts.length}. ` +
          `Expected: ${expectedDepts.join(", ")}`
      );
    }

    for (const dept of expectedDepts) {
      if (!(dept in result)) {
        throw new Error(`Missing department in response: ${dept}`);
      }

      const expected = expectedTotals[dept];
      const actual = result[dept];

      // Allow for small floating point differences
      if (Math.abs(actual - expected) > 0.01) {
        throw new Error(
          `Department ${dept}: Expected total ${expected.toFixed(2)}, got ${actual}`
        );
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Department Salary Aggregation API</h2>
      <p>
        <strong>PayrollPro Analytics</strong> needs an API endpoint that calculates total salaries by department. This
        is essential for budget planning and departmental cost analysis.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          Create a <strong>POST</strong> endpoint at <code>/total-salary</code>
        </li>
        <li>
          Accept JSON body:
          <code>{"employees": [{"name": "...", "dept": "IT", "salary": 50000}, ...]}</code>
        </li>
        <li>Group employees by <code>dept</code> and sum their <code>salary</code> values</li>
        <li>
          Return JSON with department names as keys and total salaries as values:
          <code>{"IT": 150000, "HR": 80000, ...}</code>
        </li>
      </ol>

      <h3>Test Employee Data</h3>
      <table class="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          ${employees.map(
            (emp) => html`
              <tr>
                <td>${emp.name}</td>
                <td><code>${emp.dept}</code></td>
                <td>$${emp.salary.toLocaleString()}</td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <h3>Expected Output</h3>
      <pre><code class="language-json">${JSON.stringify(expectedTotals, null, 2)}</code></pre>

      <h3>Implementation Hint</h3>
      <p>In Python, you can use a dictionary to aggregate:</p>
      <pre><code class="language-python">from collections import defaultdict

totals = defaultdict(float)
for emp in employees:
    totals[emp["dept"]] += emp["salary"]
return dict(totals)</code></pre>

      <label for="${id}" class="form-label">Enter your API base URL (e.g., https://your-server.com):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://your-api-url.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
