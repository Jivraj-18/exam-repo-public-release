export default {
    id: "sql-join",
    title: "SQL Inner Join",
    description: "Join two tables to find matching records.",
    question: \`
Given two tables: \`users\` (id, name) and \`orders\` (id, user_id, total).

Write a SQL query to select the user name and order total for all orders, using an INNER JOIN.
\`,
  answer: \`
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
\`
};
