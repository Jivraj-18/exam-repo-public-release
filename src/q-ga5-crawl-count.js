export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_crawl_html_count",
    weight,
    question: `
SiteMirror archives HTML pages.

Crawl:
https://sanand0.github.io/tdsdata/crawl_html/

Task:
1. Count how many HTML files start with letters M to Z (case-insensitive)
2. Enter the total count

Use wget / wget2 / browser download.
    `,
    input: "number",
    answer: 418,
  };
}
