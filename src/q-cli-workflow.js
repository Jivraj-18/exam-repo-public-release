export default async function ({ user, weight = 1 }) {
  const id = "q-cli-workflow-" + user;
  const title = "Interactive CLI Workflow";
  const question = html`
    <h3>Interactive CLI Workflow</h3>
    <p>
      Describe a CLI flow that:
      <ul>
        <li>Prompts for paragraph</li>
        <li>Sends to LLM for summary</li>
        <li>Asks for bullet vs one sentence</li>
        <li>Displays result</li>
      </ul>
    </p>
  `;
  const answer = async () => `
1. Prompt for text input
2. Send input to LLM for summary
3. Ask user for summary style
4. Print summary accordingly
  `;

  return { id, title, question, answer, weight };
}
