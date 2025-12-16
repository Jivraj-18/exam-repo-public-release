export default function ({ user, weight = 1 }) {
  return {
    id: "llm-embeddings",
    weight,
    question: `
A system generates embeddings for authentication messages.

Messages:
1. Your OTP is 48291 for login
2. Your OTP is 91734 for login

Write the JSON body for a POST request to:
https://api.openai.com/v1/embeddings

Use model text-embedding-3-small.
    `,
    answer: "",
  };
}
