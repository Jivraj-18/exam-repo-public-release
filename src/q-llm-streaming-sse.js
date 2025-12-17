export default async function ({ user, weight = 1 }) {
  return {
    id: "llm_streaming_sse",
    weight,

    question: `
### LLM Streaming Responses (Server-Sent Events)

Large Language Model APIs support **streaming responses**, allowing tokens to be sent incrementally as they are generated.
This is commonly implemented using **Server-Sent Events (SSE)**, which improves perceived latency and enables real-time UIs.

You are testing streaming with OpenAI-compatible APIs.

Consider the following request sent to the Chat Completions endpoint with streaming enabled:

\`\`\`json
{
  "model": "gpt-4o-mini",
  "stream": true,
  "messages": [
    { "role": "user", "content": "Say hello to ${user.email}" }
  ]
}
\`\`\`

When streaming is enabled, the API returns a sequence of SSE messages.
Each message contains a JSON object with partial output tokens.

📌 **Question**  
What is the **exact string** used by the server to indicate that the streaming response has finished?

(Enter the string exactly as it appears, including brackets.)
    `,

    type: "text",

    answer: "[DONE]",
  };
}

