export default function ({ user, weight = 1 }) {
  return {
    id: "spreadsheet_formula_eval",
    weight,
    question: `
Consider this Google Sheets formula:

=SUM(SEQUENCE(5, 1, 2, 3))

What is the result?

(Note: SEQUENCE(rows, columns, start, step))
`,
    answer: "40",
  };
}
