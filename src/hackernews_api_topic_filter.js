export default {
  id: "hackernews-api-topic-filter",

  title: "Search Hacker News Using the HNRSS API",

  marks: 1,

  difficulty: "medium",

  description: `
TechPulse Analytics monitors technology discussions to identify
high-engagement topics on Hacker News.

To automate this process, analysts use the Hacker News RSS (HNRSS) API
to search for posts mentioning specific keywords and filter them based
on community engagement.
  `,

  dataset: {
    description: "Hacker News posts retrieved via the HNRSS API",
    source: "https://hnrss.org/",
    deterministic: true
  },

  requirements: [
    "Search Hacker News using the HNRSS API",
    "Find posts that mention the keyword 'Docker'",
    "Only include posts with at least 120 points",
    "Select the most recent post that satisfies the conditions",
    "Extract the URL from the post"
  ],

  submission: {
    type: "text",
    format: "URL",
    example: "https://example.com/article"
  },

  evaluation: {
    criteria: [
      "Correct API usage",
      "Accurate filtering by keyword and points",
      "Correct identification of the most recent post",
      "Correct extraction of the link URL"
    ]
  },

  allowedTools: [
    "Browser",
    "curl",
    "Python",
    "Any HTTP client or scripting language"
  ]
};
