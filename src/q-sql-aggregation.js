export default function ({ user, weight = 1 }) {
  return {
    id: "sql_avg_salary",
    weight,
    question: `
Table: employees

department | salary
-----------|--------
HR         | 50000
Engineering| 80000
engineering| 100000
HR         | 70000
Marketing  | 60000

Write a SQL-style reasoning (no need to execute):

If we calculate the average salary per department,
treating department names as case-insensitive,
what is the average salary for Engineering?

Round to the nearest whole number.
`,
    answer: "90000",
  };
}
