export default function ({ user, weight }) {
  return {
    id: "hn-search",
    weight,
    question: `
Using the Hacker News RSS API, search for posts mentioning **Python**
with at least **80 points**.

What is the **URL** of the most recent such post?
    `,
    answer: "https://realpython.com/python-3-13/",
  };
}
