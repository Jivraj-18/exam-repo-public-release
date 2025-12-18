import { md } from "./utils/markdown.js";

/**
 * Bonus Questions by 24f2001869
 * Tools in Data Science – Dataset-free conceptual + tool reasoning
 */

export default async function ({ user, weight = 1 }) {
  return {
    id: "tds_bonus_24f2001869",
    title: "TDS Bonus Questions (24f2001869)",
    questions: [
      {
        id: "csv-missing-values",
        question: md(`
You are given the following CSV content:

\`\`\`
id,age,country
1,23,IN
2,,US
3,31,
4,29,IN
\`\`\`

A value is considered **missing** if it is empty.

**Task:**  
Count the total number of missing values (excluding header).

Enter a single integer.
        `),
        answer: "2",
        weight,
      },

      {
        id: "json-group-sum",
        question: md(`
You are given the following JSON array:

\`\`\`json
[
  {"category": "A", "value": 10},
  {"category": "B", "value": 5},
  {"category": "A", "value": 7},
  {"category": "B", "value": 3}
]
\`\`\`

**Task:**  
Group by \`category\` and compute total \`value\`.

Enter the total value for category **A**.
        `),
        answer: "17",
        weight,
      },

      {
        id: "sql-distinct-count",
        question: md(`
Consider the table below:

\`\`\`
orders
order_id | customer_id
1        | C1
2        | C2
3        | C1
4        | C3
5        | C2
\`\`\`

**Task:**  
What is the output of:

\`\`\`sql
SELECT COUNT(DISTINCT customer_id) FROM orders;
\`\`\`

Enter a single integer.
        `),
        answer: "3",
        weight,
      },

      {
        id: "mean-calculation",
        question: md(`
Given the numbers:

\`\`\`
12, 18, 20, 10, 15
\`\`\`

**Task:**  
Compute the arithmetic mean.

Round to **2 decimal places**.
        `),
        answer: "15.00",
        weight,
      },

      {
        id: "http-status-code",
        question: md(`
An API successfully creates a new resource on the server.

**Task:**  
What HTTP status code should be returned?

Enter the numeric status code.
        `),
        answer: "201",
        weight,
      },
    ],
  };
}
