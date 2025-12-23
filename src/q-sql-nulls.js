export default async function question({ user, weight = 1 }) {
  return {
    id: "sql_null_handling",
    weight,
    question: "In SQL, what is the result of the expression: SELECT 5 + NULL;",
    options: [
      "5",
      "0",
      "NULL",
      "Error"
    ],
    answer: "NULL"
  };
}
