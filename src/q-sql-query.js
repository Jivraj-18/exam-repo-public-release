import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 2: SQL Query
export async function question2({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL Aggregation Query";

  const answer = "SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department ORDER BY department";

  const question = html`
    <div class="mb-3">
      <p>
        You have a table called <code>employees</code> with columns:
        <code>id</code>, <code>name</code>, <code>department</code>, <code>salary</code>.
      </p>
      <p>
        Write a SQL query to count the number of employees in each department,
        ordered alphabetically by department name. The count column should be named
        <code>employee_count</code>.
      </p>
      <label for="${id}" class="form-label">SQL Query:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

