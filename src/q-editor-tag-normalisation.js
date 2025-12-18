export default function ({ weight = 1 }) {
  return {
    id: "editor_tag_normalisation",
    weight,
    question: `
Incident tags include:
"API Error", "api-error", "api error", "Api_Error"

You want to:
- Convert all tags to lowercase
- Replace spaces with hyphens
- Remove duplicates

Which editor feature helps you edit multiple occurrences at once?
`,
    answer: "multiple cursors",
  };
}
