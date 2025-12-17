export default function ({ user, weight }) {
  return {
    id: "wiki-outline",
    weight,
    question: `
Create an API that fetches a Wikipedia page and extracts all headings (H1–H3)
for the country **Nepal**, formatted in Markdown.

What is the **first H2 heading** after the page title?
    `,
    answer: "Etymology",
  };
}
