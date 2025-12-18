export default function ({ user, weight = 1 }) {
  return {
    id: "llm_sentiment_basic",

    weight,

    question: `
You are testing an LLM-based sentiment classifier.

The classifier must label text as one of the following:
GOOD, BAD, or NEUTRAL

Text:
"The delivery was on time, but the packaging was damaged."

What is the correct sentiment label?
    `,

    answer: "NEUTRAL",
  };
}
