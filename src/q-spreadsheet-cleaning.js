export default function ({ user, weight }) {
  return {
    id: "spreadsheet_cleaning",
    weight,
    question: `
You are given a spreadsheet column with these values:

" North America "
"APAC"
"Asia-Pacific"
" apac "

Describe the exact steps to:
1. Remove extra spaces
2. Standardize all values to "Asia Pacific"
3. Remove duplicate entries

Answer in bullet points.
`,
    type: "textarea",
    answerIncludes: ["TRIM", "Find", "Replace", "Remove Duplicates"],
  };
}
