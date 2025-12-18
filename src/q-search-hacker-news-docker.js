export default async function ({ user, weight = 0.5 }) {
  return {
    id: "search-hacker-news-docker",
    title: "Search Hacker News for Docker Posts",
    weight,

    help: [
      `
TechInsight Analytics uses Hacker News as a key data source for monitoring
technology trends. To automate media intelligence, the team wants to identify
highly engaging Hacker News posts related to specific technologies.

Using the Hacker News RSS (HNRSS) API, search for the latest Hacker News post
that mentions **Docker** and has received **at least 91 points**.

Your task:

1. Query the Hacker News RSS API for posts mentioning "Docker".
2. Filter posts with a minimum of 91 points.
3. Identify the most recent qualifying post.
4. Extract the <link> from the latest <item>.

Return ONLY the URL of the post.
      `,
    ],

    question: `
What is the URL of the latest Hacker News post mentioning "Docker" 
that has received at least 91 points?
    `,

    type: "text",

    expectedOutput: {
      type: "string",
      description:
        "URL of the latest Hacker News post mentioning Docker with at least 91 points",
    },

    grading: {
      type: "exact",
      caseSensitive: true,
      trim: true,
    },
  };
}
