import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-sql-ranking-leaders";
  const title = "SQL: Departmental Salary Ranking";
  const random = seedrandom(`${user.email}#${id}`);

  const depts = ["Engineering", "Sales", "HR", "Marketing"];
  const employees = [];
  
  for(let i=0; i<200; i++) {
    employees.push({
      id: i+1000,
      dept: pick(depts, random),
      salary: Math.floor(random() * 80000) + 40000
    });
  }

  // Calculate highest salary per department
  const maxSalaries = {};
  employees.forEach(e => {
    if (!maxSalaries[e.dept] || e.salary > maxSalaries[e.dept]) {
      maxSalaries[e.dept] = e.salary;
    }
  });

  // We ask for the SUM of the top salaries across all departments
  const totalTopSalaries = Object.values(maxSalaries).reduce((a,b) => a+b, 0);

  const sqlFile = employees.map(e => `INSERT INTO employees VALUES (${e.id}, '${e.dept}', ${e.salary});`).join("\n");
  const setupSql = `CREATE TABLE employees (emp_id INTEGER, department TEXT, salary INTEGER);\n${sqlFile}`;

  const answer = async (value) => {
    const numeric = Number(value.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(numeric)) throw new Error("Please enter the total sum as a number.");

    const allSalariesSum = employees.reduce((a, b) => a + b.salary, 0);
    if (Math.abs(numeric - allSalariesSum) < 1) {
        throw new Error("Incorrect. It looks like you summed all salaries. You need to find the MAX salary per department first, then sum those four values.");
    }

    if (Math.abs(numeric - totalTopSalaries) > 1) {
        throw new Error("The total sum is incorrect. Check your GROUP BY or PARTITION BY logic.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Departmental Leaders</h2>
      <p>
        Using SQL (<code>GROUP BY</code> or <code>RANK() OVER PARTITION</code>) or a Pivot Table:
      </p>
      <ol>
        <li>Find the <strong>maximum salary</strong> for each of the 4 departments.</li>
        <li>Calculate the <strong>sum</strong> of these 4 maximum values.</li>
      </ol>
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(new Blob([setupSql], {type: "application/sql"}), `${id}.sql`)}>
        Download salaries.sql
      </button>
      <div class="mt-3">
        <label>Sum of the max salary from each department:</label>
        <input type="number" class="form-control" id="${id}" name="${id}" required />
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}