export default function ({ user, elementMap }) {
  return {
    id: "webscraping-jobs",

    title: "Scraping Job Listings with Pagination",

    difficulty: "moderate",

    tags: ["web-scraping", "beautifulsoup", "pagination"],

    prompt: `
Scrape job title, company, and location from multiple pages of a job website.

Remove duplicate entries and store the data in a CSV file.
    `,

    validate: ({ rows }) => {
      return Array.isArray(rows) && rows.length > 0;
    }
  };
}
