export default function ({ user, weight = 1 }) {
  return {
    id: "pandas_missing_values",
    weight,
    title: "Handling Missing Values using Pandas",
    question: `
You are given a CSV dataset that contains missing values.
Which Pandas function is MOST commonly used to replace missing
values with the mean of a column?
    `,
    type: "mcq",
    options: [
      "dropna()",
      "fillna()",
      "replace()",
      "isnull()"
    ],
    answer: "fillna()"
  };
}
