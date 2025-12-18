export default function ({ user, weight }) {
  return {
    id: "q-24f2004829-1",
    title: "Total revenue per product",
    weight,
    statement: `
You are given an array of sale records. Each record has a product name and the revenue from that sale.

Implement the function totalRevenuePerProduct(sales) that returns an object mapping each product name to the sum of its revenue.
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
            { product: "apple", revenue: 30 },
          ],
        ],
        expected: { apple: 80, banana: 20 },
      },
      {
        name: "empty array",
        input: [[]],
        expected: {},
      },
    ],
  };
}
