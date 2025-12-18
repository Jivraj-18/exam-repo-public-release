export default function ({ weight = 1 }) {
  return {
    id: "llm-json-prompt",

    question: `
      You are using a Large Language Model (LLM) to summarize a document.
      The output must be machine-readable and strictly structured.

      <br><br>
      Write a <strong>prompt instruction</strong> that ensures the LLM output:
      <ul>
        <li>Is valid JSON</li>
        <li>Contains <strong>exactly two keys</strong>: <code>summary</code> and <code>keywords</code></li>
        <li>Contains <strong>no extra text</strong> outside the JSON</li>
      </ul>

      <br>
      <strong>Answer format:</strong><br>
      The exact prompt text you would give to the LLM.
    `,

    answer: `Respond ONLY with valid JSON having exactly two keys: "summary" and "keywords". Do not include any extra text outside the JSON object.`,

    weight,
  };
}
