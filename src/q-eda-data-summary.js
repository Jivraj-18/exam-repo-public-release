export default function ({ user, weight = 1 }) {
  return {
    id: "eda_data_summary",
    weight,
    title: "Exploratory Data Analysis – Data Summary",
    question: `
Which Pandas function provides a quick statistical summary
(mean, min, max, quartiles) of a DataFrame?
    `,
    type: "mcq",
    options: [
      "info()",
      "head()",
      "describe()",
      "value_counts()"
    ],
    answer: "describe()"
  };
}
