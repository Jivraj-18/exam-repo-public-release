export default async function () {
  return {
    id: "24f2005753-web-structure",
    title: "Scrape and Structure Web Data",
    difficulty: 2,
    tags: ["web-scraping", "html", "data-cleaning"],

    description: `
You are given an HTML page containing a table of products
with columns: Name, Category, Price.

Tasks:
1. Extract the table from HTML
2. Convert it into structured JSON
3. Compute the average price per category
    `,

    input: { type: "html" },

    questions: [
      {
        id: "avg-price",
        text: "What is the average price for each product category?",
        type: "json",
      },
    ],
  };
}
