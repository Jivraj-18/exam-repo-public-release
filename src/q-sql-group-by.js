/**
 * Question: SQL GROUP BY Query
 * Topic: SQL aggregation and grouping
 */

export default async function question() {
  return {
    id: "sql-group-by-count",
    title: "SQL GROUP BY Query",
    type: "short-answer",
    prompt: `Given a table 'orders' with columns: order_id, customer_id, amount, order_date

Write a SQL query to find the total number of orders placed by each customer.

Your result should have two columns: customer_id and order_count (in that order).

Enter your SQL query:`,
    answer: "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id",
    evaluate: async (userAnswer) => {
      const normalized = userAnswer
        .trim()
        .toUpperCase()
        .replace(/\s+/g, " ")
        .replace(/;$/g, "");

      const required = [
        "SELECT",
        "CUSTOMER_ID",
        "COUNT",
        "ORDER_COUNT",
        "FROM",
        "ORDERS",
        "GROUP BY",
        "CUSTOMER_ID"
      ];

      const missingKeywords = required.filter(kw => !normalized.includes(kw));

      if (missingKeywords.length === 0) {
        // Check that COUNT comes before AS order_count
        const selectPart = normalized.split("FROM")[0];
        if (selectPart.includes("COUNT") && selectPart.includes("ORDER_COUNT")) {
          return { correct: true, feedback: "Correct! Your query properly groups orders by customer and counts them." };
        }
      }

      if (missingKeywords.length > 0) {
        return { correct: false, feedback: `Missing or incorrect: ${missingKeywords.join(", ")}. Remember to use COUNT(*) and GROUP BY.` };
      }

      return { correct: false, feedback: "Query structure is incorrect. Ensure you SELECT customer_id, COUNT(*) AS order_count, then GROUP BY customer_id." };
    },
    weight: 1
  };
}