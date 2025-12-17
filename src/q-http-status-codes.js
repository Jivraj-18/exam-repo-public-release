/**
 * Question: HTTP Status Code Selection
 * Topic: REST APIs and HTTP
 */

export default async function question() {
  return {
    id: "http-status-codes-selection",
    title: "HTTP Status Code Selection",
    type: "short-answer",
    prompt: `You are building a REST API endpoint that creates a new user account.

When the account is successfully created, which HTTP status code should you return?

Enter the numeric status code only (e.g., 200, 404, etc.).`,
    answer: "201",
    evaluate: async (userAnswer) => {
      const normalized = userAnswer.trim();
      // Accept 201 (Created) as the correct answer
      // 200 is technically acceptable but 201 is more precise
      if (normalized === "201") {
        return { correct: true, feedback: "Correct! 201 Created is the proper status code for successful resource creation." };
      }
      if (normalized === "200") {
        return { correct: false, feedback: "200 OK indicates success, but 201 Created is more semantically correct for resource creation." };
      }
      return { correct: false, feedback: `Incorrect. When a resource is successfully created, the server should return 201 Created, not ${normalized}.` };
    },
    weight: 1
  };
}