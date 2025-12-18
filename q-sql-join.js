export default {
  title: "SQL: Join Logic",
  question: "Consider two tables: <b>Users</b> and <b>Orders</b>. Which JOIN type will return all users, including those who have never placed an order? <br><br> <pre>SELECT Users.name, Orders.id FROM Users ____ Orders ON Users.id = Orders.user_id;</pre>",
  options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
  answer: "LEFT JOIN",
  marks: 1
};
