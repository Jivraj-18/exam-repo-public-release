export default function ({ weight = 0.75 }) {
  return {
    id: "hn_python_100",
    title: "Hacker News Python Post",
    description: `
Search Hacker News RSS.
Keyword: Python.
Minimum points: 100.
Return the latest post link.
`,
    answer: "https://...",
    weight,
  };
}
