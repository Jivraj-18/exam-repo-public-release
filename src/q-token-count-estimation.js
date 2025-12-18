export default function ({ user, weight = 0.5 }) {
  return {
    id: "token_count_estimation",
    weight,
    question: `
When sending a chat completion request to an LLM,
which of the following contributes to token usage?

A) User message content  
B) System message content  
C) Role formatting (user/system/assistant)  
D) All of the above

Answer with A, B, C, or D.
    `,
    answer: "D",
  };
}
