export default function ({ weight = 1 }) {
  return {
    id: "crawl_html_count",
    title: "Crawled HTML File Count",
    description: `
Crawl the website to depth=2.
Count downloaded .html files.
`,
    answer:  // integer
    weight,
  };
}