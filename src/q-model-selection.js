export default async function ({ user, weight = 1 }) {
  const id = "q-model-selection-" + user;
  const title = "Model Selection & Justification";
  const question = html`
    <h3>Model Selection & Justification</h3>
    <p>
      For a real-time chat assistant and a nightly batch summarizer:
      choose suitable LLMs and justify your choice.
    </p>
  `;
  const answer = async () => `
Real-time: low-latency model (e.g., gpt-4o-mini).  
Batch summarization: high-quality model (e.g., gpt-4o) for deeper analysis.
  `;

  return { id, title, question, answer, weight };
}
