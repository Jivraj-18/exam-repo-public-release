import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-pandas-pivot-table";
  const title = "Create Pivot Table Summary in Python";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const departments = ["Sales", "Marketing", "Engineering", "HR"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
  // generate 40 employee records
  const employees = Array.from({ length: 40 }, (_, i) => ({
    employee_id: i + 1,
    department: pick(departments),
    quarter: pick(quarters),
    sales: Math.floor(random() * 50000) + 10000,
  }));

  // calculate average sales per department per quarter
  const pivotData = {};
  departments.forEach(dept => {
    pivotData[dept] = {};
    quarters.forEach(q => {
      const deptQuarterSales = employees
        .filter(e => e.department === dept && e.quarter === q)
        .map(e => e.sales);
      if (deptQuarterSales.length > 0) {
        const avg = deptQuarterSales.reduce((a, b) => a + b, 0) / deptQuarterSales.length;
        pivotData[dept][q] = Math.round(avg);
      } else {
        pivotData[dept][q] = 0;
      }
    });
  });

  const csvContent = "employee_id,department,quarter,sales\n" + 
    employees.map(e => `${e.employee_id},${e.department},${e.quarter},${e.sales}`).join("\n");

  const answer = (input) => {
    const parsed = JSON.parse(input);
    return departments.every(dept => 
      quarters.every(q => Math.abs(parsed[dept][q] - pivotData[dept][q]) < 1)
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing employee sales performance across departments and quarters.
        Given the CSV data below with <strong>40 employee records</strong>:
      </p>
      <ol>
        <li>Create a pivot table showing <strong>average sales</strong> by department and quarter</li>
        <li>Structure: Departments as top-level keys, quarters as nested keys</li>
        <li>Round all averages to the nearest integer</li>
        <li>If a department has no sales in a quarter, use 0</li>
      </ol>
      <pre style="white-space: pre-wrap"><code class="language-csv">
${csvContent}
      </code></pre>
      <p><strong>Hint:</strong> You can use Python pandas with <code>groupby()</code> or <code>pivot_table()</code></p>
      <label for="${id}" class="form-label">
        Pivot table (JSON format):
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" placeholder='{"Sales": {"Q1": 12345, "Q2": 23456, ...}, ...}'></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
