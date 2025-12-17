export default async function ({ user, weight = 1 }) {
  return {
    id: "llm_streaming_sse",
    weight,

    help: [
      `
LLM Streaming Responses — Server-Sent Events (SSE)

Large Language Model APIs support streaming responses, allowing tokens
to be sent incrementally as they are generated. This is commonly
implemented using Server-Sent Events (SSE), which improves perceived
latency and enables real-time user interfaces.

You are testing streaming with OpenAI-compatible APIs.

Consider the following request sent to the Chat Completions endpoint
with streaming enabled:

{
  "model": "gpt-4o-mini",
  "stream": true,
  "messages": [
    { "role": "user", "content": "Say hello to ${user.email}" }
  ]
}

When streaming is enabled, the API returns a sequence of SSE messages.
Each message contains a JSON object with partial output tokens.

Task:

1. Observe the sequence of streamed SSE messages.
2. Identify the exact string sent by the server to signal
   that the streaming response has completed.
      `,
    ],

    question: `
What is the exact string used by the server to indicate that the streaming
response has finished?
(Enter the string exactly as it appears, including brackets.)
    `,

    type: "text",
    answer: "[DONE]",
  };
}
