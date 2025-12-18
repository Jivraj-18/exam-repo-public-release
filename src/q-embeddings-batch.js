export default function ({ user, weight = 1 }) {
  return {
    id: "embeddings-batch",
    title: "Batch Text Embeddings Request",
    weight,
    prompt: `
Write ONLY the JSON body for an OpenAI embeddings request that embeds
the following 3 texts using text-embedding-3-small:

1. "Fraud detected in transaction"
2. "Payment successful"
3. "Unusual login attempt"

Do NOT include headers or URL.
    `,
    answer: `
{
  "model": "text-embedding-3-small",
  "input": [
    "Fraud detected in transaction",
    "Payment successful",
    "Unusual login attempt"
  ]
}
    `.trim(),
  };
}
