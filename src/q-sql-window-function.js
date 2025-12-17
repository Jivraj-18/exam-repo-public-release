export default function ({ user, weight = 1 }) {
  return {
    id: "q_sql_window_function",
    title: "SQL: Rank users by total spend",
    description: `
Given table orders(user_id, amount),
rank users by total spend using SQL window functions.
Return user_id, total_spend, and rank.
`,
    weight,
    evaluate: async ({ sql }) => {
      return sql(`
SELECT user_id,
       SUM(amount) AS total_spend,
       RANK() OVER (ORDER BY SUM(amount) DESC) AS rank
FROM orders
GROUP BY user_id;
`);
    },
  };
}