export default async function ({ user, weight = 1 }) {
  return {
    id: "ga5_hn_rss_filter",
    weight,
    question: `
TechPulse monitors Hacker News discussions.

Use the HN RSS feed:
https://hnrss.org/newest?q=Python&points=50

Task:
1. Find the MOST RECENT post mentioning "Python"
2. It must have at least 50 points
3. Extract the <link> URL

Enter ONLY the URL.
    `,
    input: "text",
    answer: "https://github.com/python/cpython",
  };
}
