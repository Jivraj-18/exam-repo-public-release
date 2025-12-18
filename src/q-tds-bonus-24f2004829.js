export default function () {
  return {
    id: "q-tds-bonus-24f2004829",
    title: "Total revenue per product",
    statement: `
You are given an array of sale records. Each record has a product name and the revenue from that sale.

Implement the function totalRevenuePerProduct(sales) that returns an object mapping each product name to the sum of its revenue.

Example:
Input:
[
  { product: "apple", revenue: 50 },
  { product: "banana", revenue: 20 },
  { product: "apple", revenue: 30 }
]

Output:
{ apple: 80, banana: 20 }
    `,
    starterCode: `
function totalRevenuePerProduct(sales) {
  // TODO: Write your code here
}

module.exports = totalRevenuePerProduct;
    `,
    tests: [
      {
        name: "simple case",
        input: [
          [
            { product: "apple", revenue: 50 },
            { product: "banana", revenue: 20 },
            { product: "apple", revenue: 30 }
          ]
        ],
        expected: { apple: 80, banana: 20 }
      },
      {
        name: "single product",
        input: [
          [
            { product: "pen", revenue: 10 },
            { product: "pen", revenue: 15 }
          ]
        ],
        expected: { pen: 25 }
      },
      {
        name: "empty array",
        input: [[]],
        expected: {}
      }
    ]
  };
}
