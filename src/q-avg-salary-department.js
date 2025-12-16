import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

// Average salary by department
//
// This question generates a random list of employees, each with a department and salary. Students
// must compute the average salary for each department and return the results as a minified
// JSON object mapping department names to average salaries. The answer function calculates the
// expected averages using the same seeded random generator so that every user receives a unique
// but deterministic dataset based on their email address. Values should be rounded to two
// decimal places to avoid floating‑point discrepancies.

export default async function ({ user, weight = 1 }) {
  const id = "q-avg-salary-department";
  const title = "Compute average salary by department";

  // deterministic RNG seeded by user email and question id
  const random = seedrandom(`${user.email}#${id}`);
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
  const adjectives = ["Senior", "Junior", "Lead", "Principal", "Assistant", "Director"];
  const names = ["Alex", "Riya", "Sam", "Li", "Carlos", "Mina", "Jordan", "Sanjay", "Tara", "Otto"];

  // generate 50 employees with random department and salary between 50k and 150k
  const employees = Array.from({ length: 50 }, () => {
    const dept = departments[Math.floor(random() * departments.length)];
    const salary = Number((50000 + random() * 100000).toFixed(2));
    const name = `${adjectives[Math.floor(random() * adjectives.length)]} ${names[Math.floor(random() * names.length)]}`;
    return { name, department: dept, salary };
  });

  // calculate average salary per department
  const totals = {};
  const counts = {};
  for (const emp of employees) {
    totals[emp.department] = (totals[emp.department] || 0) + emp.salary;
    counts[emp.department] = (counts[emp.department] || 0) + 1;
  }
  const expected = {};
  for (const dept of Object.keys(totals)) {
    expected[dept] = Number((totals[dept] / counts[dept]).toFixed(2));
  }

  const answer = (input) => {
    let obj;
    try {
      obj = JSON.parse(input);
    } catch (err) {
      throw new Error("Input must be valid JSON");
    }
    // ensure all departments are included and averages match to two decimals
    const keys = Object.keys(expected).sort();
    const inputKeys = Object.keys(obj).sort();
    if (JSON.stringify(keys) !== JSON.stringify(inputKeys)) {
      throw new Error("Returned departments mismatch");
    }
    return keys.every((dept) => Number(obj[dept].toFixed(2)) === expected[dept]);
  };

  const question = html`\n    <div class="mb-3">\n      <p>\n        You have been given a company’s employee roster as a JSON array. Each employee has a\n        <code>name</code>, <code>department</code> and <code>salary</code> (in rupees per year). Calculate the\n        <strong>average salary</strong> for each department. Round each average to two decimal places and\n        return the results as a JSON object where the keys are department names and the values are the\n        average salaries. For example: <code>{"Engineering":60000.50, "HR":55000.00, ...}</code>\n      </p>\n      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(employees, null, 2)}</code></pre>\n      <label for="${id}" class="form-label">Average salaries (JSON object):</label>\n      <input class="form-control" id="${id}" name="${id}" />\n    </div>\n  `;

  return { id, title, weight, question, answer };
}
