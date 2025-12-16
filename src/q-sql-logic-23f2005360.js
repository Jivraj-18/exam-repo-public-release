

export default function ({ weight = 1 }) {
  return {
    id: "sql_logic",
    question: html`
      <p>
        Consider a SQL query:
      </p>
      <pre>
SELECT COUNT(*)
FROM students
WHERE marks > 70 OR marks < 40;
      </pre>
      <p>
        If the table has 100 students and exactly:
      </p>
      <ul>
        <li>30 students scored above 70</li>
        <li>25 students scored below 40</li>
      </ul>
      <p>How many rows will the query return?</p>
    `,
    answer: 55,
    weight,
  };
}
