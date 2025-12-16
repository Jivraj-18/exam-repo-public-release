export default function ({ user, weight = 2 }) {
  return {
    id: "advanced-html-crawl-analysis",
    title: "Advanced Website Crawling and HTML Analysis",
    weight,

    description: `
Crawl the website:

https://sanand0.github.io/tdsdata/crawl_html/

Crawling requirements:
• Crawl only HTML files
• Preserve directory structure
• Do not crawl parent directories
• Limit recursion depth to 3

After crawling:

1. Consider only files with .html or .htm extensions
2. Ignore files named index.html or index.htm
3. Count how many remaining HTML files have filenames starting with letters from O to Z (case-insensitive)

What is the total number of such HTML files?

Enter only the number.
    `,

    type: "input",
    placeholder: "Enter the number",
  };
}

