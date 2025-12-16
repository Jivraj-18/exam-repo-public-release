import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sql-mock-hr-overtime";
  const title = "SQL Logic: Employee Overtime Calculation";

  const random = seedrandom(`${user.email}#${id}`);

  const employees = ["Emp_A", "Emp_B", "Emp_C", "Emp_D"];
  const csvRows = [["employee_id", "date", "hours_worked"]];
  
  let targetEmployee = pick(employees, random);
  let totalOvertimeHours = 0;

  for (let d = 1; d <= 20; d++) { // 20 work days
    const date = `2024-11-${String(d).padStart(2, '0')}`;
    
    for (const emp of employees) {
      // 7 to 12 hours worked
      const hours = 7 + Math.floor(random() * 6); 
      csvRows.push([emp, date, hours]);

      if (emp === targetEmployee && hours > 8) {
        totalOvertimeHours += (hours - 8);
      }
    }
  }

  const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    const input = Number(value);
    if (input !== totalOvertimeHours) throw new Error("Incorrect overtime calculation.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="hr-overtime">HR: Overtime Calculation</h2>
      <p>
        HR needs to pay overtime. Standard work hours are 8 hours per day. Any time worked above 8 hours in a single day is considered overtime.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Filter data for Employee <strong>${targetEmployee}</strong>.</li>
        <li>For each day, calculate <code>MAX(0, hours_worked - 8)</code>.</li>
        <li>Sum these values to get the total overtime hours for the period.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        Total overtime hours for ${targetEmployee}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}