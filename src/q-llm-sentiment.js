export default function ({ user, weight = 1 }) {
  return {
    id: "llm-sentiment",
    weight,
    question: `
A company wants to test an LLM-based sentiment classifier.

Text:
X9zKp  72LQxA  MvRt09  qwePOIu

Write a Python program using httpx that sends this text to OpenAI's
chat completion API using model gpt-4o-mini to classify sentiment
as POSITIVE, NEGATIVE, or NEUTRAL.
    `,
    answer: "",
  };
}
