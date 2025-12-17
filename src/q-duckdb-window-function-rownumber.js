import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-window-function-rownumber";
  const title = "DuckDB Window Function Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate random data
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];
  const targetDepartment = departments[randInt(0, departments.length - 1)];
  const targetRank = randInt(2, 3); // 2nd or 3rd highest salary

  // Generate employee data
  const employees = [];
  const numEmployees = randInt(15, 25);
  
  for (let i = 0; i < numEmployees; i++) {
    employees.push({
      id: i + 1,
      name: `Employee${i + 1}`,
      department: departments[randInt(0, departments.length - 1)],
      salary: randInt(50, 150) * 1000, // Salaries between 50k-150k
    });
  }

  // Filter by department, sort by salary descending, get the nth highest
  const deptEmployees = employees
    .filter(e => e.department === targetDepartment)
    .sort((a, b) => b.salary - a.salary);

  let expectedSalary = 0;
  if (deptEmployees.length >= targetRank) {
    expectedSalary = deptEmployees[targetRank - 1].salary;
  }

  const answer = (input) => {
    const value = parseInt(String(input).trim(), 10);
    if (isNaN(value)) throw new Error("Answer must be a valid integer");
    if (expectedSalary === 0) {
      throw new Error(`No ${targetRank}${targetRank === 2 ? 'nd' : 'rd'} highest salary in ${targetDepartment}`);
    }
    if (value !== expectedSalary) {
      throw new Error(`Expected ${expectedSalary}, got ${value}`);
    }
    return true;
  };

  const csvData = employees.map(e => `${e.id},${e.name},${e.department},${e.salary}`).join('\n');

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Employee Compensation Analysis with DuckDB</h4>
      <p>
        <strong>TalentMetrics Corp</strong> is analyzing employee compensation across departments using DuckDB for
        in-memory SQL analytics. The HR analytics team needs to identify top earners within each department using
        window functions and partitioning.
      </p>

      <h5>Dataset</h5>
      <p>Below is the <code>employees.csv</code> data:</p>
      <pre style="max-height: 200px; overflow-y: auto;"><code>id,name,department,salary
${csvData}</code></pre>

      <h5>Task</h5>
      <p>
        Using DuckDB, you need to find the <strong>${targetRank}${targetRank === 2 ? 'nd' : 'rd'} highest salary</strong>
        in the <strong>${targetDepartment}</strong> department.
      </p>

      <h5>SQL Query Approach</h5>
      <p>You should use a window function query like this:</p>
      <pre><code class="language-sql">SELECT 
  id, 
  name, 
  department, 
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM read_csv_auto('employees.csv')
WHERE department = '${targetDepartment}'
QUALIFY rank = ${targetRank};</code></pre>

      <p class="text-muted">
        <strong>Hint:</strong> Use DuckDB's <code>ROW_NUMBER()</code> window function partitioned by department,
        ordered by salary descending, then filter for rank = ${targetRank}.
      </p>

      <label for="${id}" class="form-label">
        What is the ${targetRank}${targetRank === 2 ? 'nd' : 'rd'} highest salary in ${targetDepartment}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: duckdb_window_analysis.py

# /// script
# requires-python = ">=3.12"
# dependencies = ["duckdb"]
# ///

import duckdb

def find_nth_highest_salary(csv_data: str, department: str, rank: int) -> int:
    """
    Find the nth highest salary in a specific department using DuckDB.
    
    Uses window function ROW_NUMBER() with PARTITION BY and ORDER BY.
    """
    # Create in-memory DuckDB connection
    con = duckdb.connect(':memory:')
    
    # Create table from CSV data
    con.execute("""
        CREATE TABLE employees AS 
        SELECT * FROM read_csv_auto('employees.csv')
    """)
    
    # Query with window function
    query = f"""
        SELECT salary
        FROM (
            SELECT 
                salary,
                ROW_NUMBER() OVER (
                    PARTITION BY department 
                    ORDER BY salary DESC
                ) as rank
            FROM employees
            WHERE department = '{department}'
        )
        WHERE rank = {rank}
    """
    
    result = con.execute(query).fetchone()
    
    return result[0] if result else 0


if __name__ == "__main__":
    # Example with sample data
    salary = find_nth_highest_salary('employees.csv', 'Engineering', 2)
    print(f"2nd highest salary in Engineering: {salary}")
*/