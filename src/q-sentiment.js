export default function ({ user, weight }) {
  return {
    id: "sentiment_analysis",
    weight,
    question: `
Write the JSON body for a chat completion request that:

• Uses model gpt-4o-mini  
• Includes a system message: "Classify sentiment as Positive, Negative, or Neutral"  
• Includes a user message: "Delivery was delayed but support was helpful"  
• Produces ONLY a single-word response  

Write only the JSON body.
`,
    type: "textarea",
    answerIncludes: ["gpt-4o-mini", "messages"],
  };
}
