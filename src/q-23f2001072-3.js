import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-23f2001072-3";
  const title = "SQL Join Mechanics";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Create Table A and Table B data
  // Table A: Employees (id, name, dept_id)
  // Table B: Departments (id, dept_name)

  const empIds = [1, 2, 3, 4, 5];
  const commonDeptIds = [101, 102];
  const uniqueDeptIdA = 103;
  const uniqueDeptIdB = 104;

  // Employees have dept 101, 102, 102, 103, NULL
  const employees = [
    { id: 1, name: "Alice", dept_id: 101 },
    { id: 2, name: "Bob", dept_id: 102 },
    { id: 3, name: "Charlie", dept_id: 102 },
    { id: 4, name: "David", dept_id: 103 },
    { id: 5, name: "Eve", dept_id: null },
  ];

  // Departments have 101, 102, 104
  const departments = [
    { id: 101, name: "HR" },
    { id: 102, name: "IT" },
    { id: 104, name: "Sales" },
  ];

  const joins = ["INNER", "LEFT", "RIGHT"];
  const joinType = pick(joins);

  let expectedRows = 0;
  if (joinType === "INNER") {
    // 101(Alice), 102(Bob), 102(Charlie) -> 3 rows
    expectedRows = 3;
  } else if (joinType === "LEFT") {
    // All employees. 101, 102, 102, 103(match null), null(match null) -> 5 rows
    // Actually LEFT JOIN preserves left table rows. Matches: 3. No match: 2. Total 5.
    expectedRows = 5;
  } else if (joinType === "RIGHT") {
    // All departments. 101(Alice), 102(Bob, Charlie), 104(no match).
    // 101 -> 1 match
    // 102 -> 2 matches
    // 104 -> 1 match (null emp)
    // Total 4
    expectedRows = 4;
  }

  const empTableHtml = employees.map(e => html`<tr><td>${e.id}</td><td>${e.name}</td><td>${e.dept_id ?? "NULL"}</td></tr>`);
  const deptTableHtml = departments.map(d => html`<tr><td>${d.id}</td><td>${d.name}</td></tr>`);

  const answer = (input) => {
    return parseInt(input.trim()) === expectedRows;
  };

  const question = html`
    <div class="mb-3">
      <p>Consider the following two tables:</p>
      
      <div class="row">
        <div class="col-md-6">
          <strong>Employees</strong>
          <table class="table table-sm table-bordered">
            <thead><tr><th>id</th><th>name</th><th>dept_id</th></tr></thead>
            <tbody>
              ${empTableHtml}
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <strong>Departments</strong>
          <table class="table table-sm table-bordered">
            <thead><tr><th>id</th><th>dept_name</th></tr></thead>
            <tbody>
              ${deptTableHtml}
            </tbody>
          </table>
        </div>
      </div>

      <p>
        How many rows will be returned by the following SQL query?
      </p>
      <pre><code>SELECT * 
FROM Employees E
${joinType} JOIN Departments D ON E.dept_id = D.id;</code></pre>
      
      <label for="${id}" class="form-label">Number of rows:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
