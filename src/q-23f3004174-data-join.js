export default {
  id: "23f3004174-database-joins",
  title: "Customer Order Join Analysis",
  difficulty: 2,
  tags: ["data-joins", "analysis"],

  description: `
You are given two CSV files:
1. customers.csv (customer_id, name)
2. orders.csv (order_id, customer_id, amount)

Task:
Find the customer name with the highest total order amount.
  `,

  input: {
    type: "files",
    count: 2,
    extensions: [".csv"],
  },

  questions: [
    {
      id: "top-customer",
      text: "Which customer has the highest total purchase?",
      type: "text",
    },
  ],
};
