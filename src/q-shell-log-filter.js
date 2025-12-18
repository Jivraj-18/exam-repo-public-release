export default function ({ weight = 1 }) {
  return {
    id: "shell_log_filter",
    weight,
    question: `
You are analysing HTTP access logs.

Each line contains:
timestamp method path status bytes cluster

You need to count:
- GET requests
- path starts with /api/items
- status code between 200–299
- cluster = use1

Which shell command is BEST suited to count matching lines?
`,
    answer: "grep",
  };
}
