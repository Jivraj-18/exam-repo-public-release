export default {
  id: "23f3004174-bonus-log-errors",
  title: "Analyze Server Error Logs",
  difficulty: 2,
  tags: ["python", "file-handling", "data-analysis"],

  description: `
You are given a server log file.

Each line is in the format:
[TIMESTAMP] LEVEL MESSAGE

Example:
[2025-02-01 09:10] ERROR Disk quota exceeded

Tasks:
1. Count how many ERROR messages occurred.
2. Identify the most frequent ERROR message.
  `,

  input: {
    type: "file",
    extensions: [".log"],
  },

  questions: [
    {
      id: "error-count",
      text: "How many ERROR log entries are present?",
      type: "number",
    },
    {
      id: "most-common",
      text: "What is the most frequent ERROR message?",
      type: "text",
    },
  ],
};
