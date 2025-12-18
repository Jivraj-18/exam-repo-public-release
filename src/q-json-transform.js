export default function ({ weight = 1 }) {
  return {
    id: "json_transform_emails",
    title: "JSON Email Extraction",
    description: `
Load the JSON data.
Filter users with age > 30.
Extract email fields.
Sort alphabetically.
`,
    answer: [
      "email1@example.com",
      "email2@example.com"
    ],
    weight,
  };
}