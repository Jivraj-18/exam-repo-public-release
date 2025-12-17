export default async function ({ user, weight = 1 }) {
  return {
    id: "vibe-coding",
    title: "Vibe Coding – Prompt Engineering",
    question: `
Write a SINGLE prompt that makes GPT-5 Nano output ONLY the body of a JavaScript function.

Function behavior:
- Uses existing variables url and threshold
- Fetches JSON
- Filters active === true
- Squares numbers
- Keeps values > threshold
- Returns sum
- On error returns 0
- Uses async/await
- Exactly ONE return statement
- No comments, no explanation

Only the prompt text is required.
    `,
    answer: "",
    weight,
  };
}
