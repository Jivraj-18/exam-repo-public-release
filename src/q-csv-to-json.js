export default function ({ user, weight = 1 }) {
  return {
    id: "csv_to_json",
    type: "mcq",
    weight,
    question: `
Given the following CSV data:

name,score
Alice,85
Bob,92

What is the correct JSON representation?
    `,
    options: [
      '[{"name":"Alice","score":85},{"name":"Bob","score":92}]',
      '{"name":"Alice","score":85,"name":"Bob","score":92}',
      '[{"Alice":85},{"Bob":92}]',
      '{"Alice":85,"Bob":92}'
    ],
    answer: 0
  };
}
