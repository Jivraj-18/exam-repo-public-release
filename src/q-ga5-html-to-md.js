export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_html_to_md_table",
    weight,
    question: `
DocFlow converts HTML reports to Markdown.

Convert this page to Markdown:
https://sanand0.github.io/tdsdata/html_table/9.html

Task:
1. Convert ONLY the table to Markdown
2. Ensure every cell matches exactly
3. Paste ONLY the Markdown table

No extra text.
    `,
    input: "text",
    answer: `| Name | Score |
|------|-------|
| A    | 12    |
| B    | 18    |
| C    | 21    |`,
  };
}
