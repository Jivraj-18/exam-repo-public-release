export default function ({ user, weight = 1 }) {
  return {
    id: "rss_latest_item",
    title: "RSS Feed Scraper",
    weight,
    description: `
Using the Hacker News RSS feed:
https://hnrss.org/frontpage

Extract the **title of the most recent item**.

Return the title exactly as shown.
    `,
    inputType: "text",
    expectedAnswerType: "string",
    checker: async (answer) => answer.length > 10,
  };
}
