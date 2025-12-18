import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight }) {
  return {
    id: "csv-department-salary-analysis",
    weight,
    question: html`
      <h2>CSV Department Analysis</h2>
      <ol>
        <li>Download the CSV file from this URL: <code>/data/employees_q4.csv</code></li>
        <li>Filter for employees in the <code>Engineering</code> department</li>
        <li>Calculate the average salary for these employees</li>
        <li>Apply offset: <code>(length of your email) mod 100</code></li>
        <li>Final answer = average_salary + offset, rounded to 2 decimal places</li>
        <li>Submit the number as your answer</li>
      </ol>
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${user.email.length}</p>
      <p><strong>CSV Content (for testing):</strong></p>
      <pre>
Employee ID,Name,Department,Salary,Hire Date
E001,Alice Johnson,Engineering,95000.00,2022-03-15
E002,Bob Smith,Marketing,72000.00,2023-01-10
E003,Carol White,Engineering,88000.00,2021-07-22
E004,David Brown,Sales,65000.00,2023-06-05
E005,Eve Davis,Engineering,102000.00,2020-11-30
E006,Frank Miller,Marketing,78000.00,2022-09-18
E007,Grace Lee,Engineering,91000.00,2023-02-14
      </pre>
    `,
    validate: (answer) => {
      // Filter out engineering department salaries from CSV
      const engineeringSalaries = [
        95000.00, // Alice Johnson
        88000.00, // Carol White
        102000.00, // Eve Davis
        91000.00, // Grace Lee
      ];

      // Step 1: Calculate the average salary for Engineering department
      const averageSalary = engineeringSalaries.reduce((a, b) => a + b, 0) / engineeringSalaries.length;

      // Step 2: Calculate the offset based on the user's email length
      const offset = user.email.length % 100;

      // Step 3: Final expected value
      const expected = (averageSalary + offset).toFixed(2);

      // Step 4: Handle the submitted answer
      const submitted = parseFloat(answer).toFixed(2);

      if (submitted === expected) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: html`
          <p><strong>Expected:</strong> ${expected}</p>
          <p><strong>Got:</strong> ${answer}</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li><strong>Average Salary:</strong> ${averageSalary.toFixed(2)}</li>
            <li><strong>Offset:</strong> ${offset}</li>
            <li><strong>Email Length:</strong> ${user.email.length}</li>
          </ul>
          <p>Remember, the final answer is the average salary of the Engineering department plus the offset.</p>
        `,
      };
    },
  };
}
