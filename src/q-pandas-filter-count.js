export default function ({ user, weight = 1 }) {
  return {
    id: "pandas_filter_count",
    type: "mcq",
    weight,
    question: `
Consider the following Pandas code:

df[df["score"] > 80].shape[0]

What does this expression return?
    `,
    options: [
      "Total number of columns in the DataFrame",
      "Number of rows where score is greater than 80",
      "Maximum score value",
      "Sum of all scores"
    ],
    answer: 1
  };
}
