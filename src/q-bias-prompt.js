export default async function ({ user, weight = 1 }) {
  const id = "q-bias-prompt-" + user;
  const title = "LLM Fairness & Bias Detection";
  const question = html`
    <h3>LLM Fairness & Bias Detection</h3>
    <p>
      Write an LLM prompt that instructs a model to:
      <ul>
        <li>Classify into: CALM / UPSET / NEUTRAL</li>
        <li>Detect whether wording could be biased</li>
        <li>Return JSON: { "sentiment": "...", "bias_warning": true|false }
      </ul>
    </p>
  `;
  const answer = async () => `
Write a prompt:

"Classify the message into CALM, UPSET or NEUTRAL. Also detect potential bias related to gender/age/region. Return only JSON with keys \\"sentiment\\" and \\"bias_warning\\"."
  `;

  return { id, title, question, answer, weight };
}
