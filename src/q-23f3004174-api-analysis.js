export default {
  id: "23f3004174-api-response",
  title: "Analyze REST API Response Data",
  difficulty: 2,
  tags: ["api", "json", "analysis"],

  description: `
A REST API returns a JSON array of users.

Fields:
- id
- country
- active (true/false)

Tasks:
1. Count active users
2. Identify country with maximum active users
  `,

  input: { type: "json" },

  questions: [
    {
      id: "active-users",
      text: "How many users are active?",
      type: "number",
    },
    {
      id: "top-country",
      text: "Which country has the highest number of active users?",
      type: "text",
    },
  ],
};
