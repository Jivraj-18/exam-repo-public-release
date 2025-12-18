export default async function question({ user, weight = 1 }) {
  return {
    id: "q-csv-validation",
    title: "CSV Validation Pipeline",
    weight,
     answer: {
      type: "textarea",
      placeholder: "Paste your CSV validation code here",
      validate: (input) =>
        input.includes(".data(") &&
        input.includes("enter"),
    },
  };
}