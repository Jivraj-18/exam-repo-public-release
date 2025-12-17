export default async function ({ user, weight = 1 }) {
  return {
    id: "ai-assisted-debugging",
    question: `
You are given a Python script \`broken_metric.py\`.
The script executes successfully but produces an incorrect numeric output.

Your task:
1. Use any LLM (ChatGPT, Claude, Gemini, Copilot Chat).
2. Write a clear debugging prompt that includes:
   - The code
   - The expected output
   - The actual output
3. Apply the fix suggested by the LLM.
4. Run the corrected script.

Submit the FINAL numeric output printed by the corrected script.
`,
    type: "number",
    answer: 128.75,
    tolerance: 0.01,
    weight,
  };
}
