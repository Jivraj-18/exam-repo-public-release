export default {
  id: "llm-sentiment",
  weight: 1,
  question: `
A company wants to test an LLM-based sentiment classifier.

Text:
X9zKp  72LQxA  MvRt09  qwePOIu

Write a Python program using httpx that sends this text to OpenAI's
chat completion API using model gpt-4o-mini to classify sentiment
as POSITIVE, NEGATIVE, or NEUTRAL.
  `,
  answer: ""
};

