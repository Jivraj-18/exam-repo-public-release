export default {
  id: "structured-output",
  weight: 1,
  question: `
A logistics company needs fake Indian address data for testing.

Write the JSON body for a request to:
https://api.openai.com/v1/chat/completions

Requirements:
- Use model gpt-4o-mini
- System message: Respond only in JSON
- User message: Generate 5 random Indian addresses
- Output must contain an array called addresses
- Each address must have state, city, and pincode
- additionalProperties must be false
  `,
  answer: ""
};
