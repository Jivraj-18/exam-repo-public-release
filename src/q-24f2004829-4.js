export default function ({ user, weight }) {
  return {
    id: "q-24f2004829-4",
    title: "Filter high value transactions",
    weight,
    statement: `
You are given an array of transaction objects. Each transaction has an id and an amount.

Implement the function filterHighValueTransactions(transactions, threshold) that returns an array containing only those transactions whose amount is strictly greater than threshold.

Example:
Input:
transactions = [
  { id: 1, amount: 500 },
  { id: 2, amount: 1200 },
  { id: 3, amount: 800 }
], threshold = 800

Output:
[
  { id: 2, amount: 1200 }
]
`,
    starterCode: `
function filterHighValueTransactions(transactions, threshold) {
  // TODO: Write your code here
}

module.exports = filterHighValueTransactions;
`,
    tests: [
      {
        name: "simple filter",
        input: [
          [
            { id: 1, amount: 500 },
            { id: 2, amount: 1200 },
            { id: 3, amount: 800 },
          ],
          800,
        ],
        expected: [{ id: 2, amount: 1200 }],
      },
      {
        name: "no transaction above threshold",
        input: [
          [
            { id: 1, amount: 100 },
            { id: 2, amount: 200 },
          ],
          300,
        ],
        expected: [],
      },
      {
        name: "all transactions above threshold",
        input: [
          [
            { id: 1, amount: 1000 },
            { id: 2, amount: 2000 },
          ],
          500,
        ],
        expected: [
          { id: 1, amount: 1000 },
          { id: 2, amount: 2000 },
        ],
      },
    ],
  };
}
