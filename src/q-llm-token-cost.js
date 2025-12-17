export default {
  id: "llm-token-cost",
  weight: 1,
  question: `
A developer sends the following single user message to gpt-4o-mini:

Return only valid English words from: zX9, hello, 9aQ, world, abc123

How many input tokens are consumed by this request including
system overhead?
  `,
  answer: ""
};
