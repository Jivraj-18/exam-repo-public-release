import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-groupby-aggregation";
  const title = "CSV Data GroupBy and Aggregation";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate employee sales data
  const employees = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  const departments = ["Sales", "Marketing", "IT"];
  const months = ["Jan", "Feb", "Mar"];

  const salesRecords = Array.from({ length: 45 }, (_, i) => ({
    employee: pick(employees),
    department: pick(departments),
    month: pick(months),
    sales_amount: randInt(1000, 5000),
  }));

  // Choose a department to analyze
  const targetDept = pick(departments);

  // Calculate expected answer: max sales by any employee in target department
  const deptRecords = salesRecords.filter(r => r.department === targetDept);
  
  // Group by employee and sum their sales
  const employeeSales = {};
  deptRecords.forEach(record => {
    if (!employeeSales[record.employee]) {
      employeeSales[record.employee] = 0;
    }
    employeeSales[record.employee] += record.sales_amount;
  });

  const maxSales = Math.max(...Object.values(employeeSales));

  const answer = (input) => {
    const value = parseInt(input, 10);
    if (isNaN(value)) throw new Error("Answer must be an integer");
    if (value === maxSales) return true;
    throw new Error(`Expected ${maxSales}, got ${value}`);
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing quarterly sales performance across different departments. Use pandas groupby 
        operations to aggregate the data and find top performers.
      </p>
      <h5>Sales Records:</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(salesRecords, null, 2)}
      </code></pre>
      <h5>Task:</h5>
      <ol>
        <li>Load the data into a pandas DataFrame</li>
        <li>Filter for the <strong>${targetDept}</strong> department only</li>
        <li>Group by <code>employee</code> and calculate total <code>sales_amount</code> for each employee</li>
        <li>Find the <strong>maximum</strong> total sales by any single employee in ${targetDept}</li>
        <li>Use: <code>df[df['department']=='${targetDept}'].groupby('employee')['sales_amount'].sum().max()</code></li>
      </ol>
      <p class="text-muted">
        GroupBy operations are essential for aggregating data by categories. This is similar to SQL's GROUP BY clause.
      </p>
      <label for="${id}" class="form-label">Maximum total sales by any employee in ${targetDept}:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
