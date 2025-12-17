export default function ({ user, weight }) {
  return {
    id: "log_filtering",
    weight,
    question: `
You have a server log file named access.log.

Write a shell command that:
• Selects only GET requests  
• Keeps paths starting with /api/reports  
• Filters responses with 4xx status codes  
• Outputs the total count  

Use standard shell tools only.
`,
    type: "textarea",
    answerIncludes: ["grep", "awk", "wc"],
  };
}
