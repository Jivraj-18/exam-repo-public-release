export default async function ({ user, weight = 1 }) {
  return {
    id: "csv-to-json-python",
    weight,
    title: "Convert CSV to JSON using Python",
    question: `
You have a CSV file \`students.csv\` with columns:
id, name, marks.

Which pandas method converts a DataFrame to JSON?
    `,
    options: [
      "to_csv()",
      "to_dict()",
      "to_json()",
      "json.dump()",
    ],
    answer: 2,
  };
}
