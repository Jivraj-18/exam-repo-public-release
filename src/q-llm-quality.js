export default async function ({ user, weight = 1 }) {
  const id = "q-llm-quality-" + user;
  const title = "LLM Quality Report Instruction";
  const question = html`
    <h3>LLM Quality Report</h3>
    <p>
      Write natural language instruction to an LLM to produce a data
      quality report listing missing values, outliers, and summary.
    </p>
  `;
  const answer = async () => `
"Analyze the CSV, identify missing values, describe outliers, and provide a plain-English summary."
  `;

  return { id, title, question, answer, weight };
}
