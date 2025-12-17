export default {
  id: "q_sql_group_having",
  title: "SQL: GROUP BY with HAVING",
  description: `
From table transactions(user_id, amount),
return users whose total amount > 500.
`,
  evaluate: async ({ sql }) => {
    return sql(`
SELECT user_id, SUM(amount) AS total_amount
FROM transactions
GROUP BY user_id
HAVING SUM(amount) > 500;
`);
  },
};
