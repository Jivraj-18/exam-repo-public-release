export default async function({ user, weight = 1 }) {
  const id = "q-llm-prompt-evaluation";
  const title = "Evaluate LLM prompt responses";

  const questionHTML = `
    <div class="mb-3">
      <p><strong>Case Study: LLM Prompt Quality</strong></p>
      <p>
        You are testing prompts for a Large Language Model. Write a Python function that:
        <ul>
          <li>Submits a prompt to the model</li>
          <li>Evaluates the response quality based on relevance and correctness</li>
          <li>Returns a score (e.g., 0-1 or 0-5)</li>
        </ul>
      </p>
      <label for="${id}" class="form-label">Your Python code:</label>
      <textarea class="form-control" id="${id}" rows="6"></textarea>
    </div>
  `;

  const answer = async () => {
    const $input = document.getElementById(id);
    if (!$input || !$input.value) throw new Error("No code submitted");

    const userCode = $input.value;

    // Minimal validation: check for model interaction
    if (!userCode.includes("openai") && !userCode.includes("llm") && !userCode.includes("prompt")) {
      throw new Error("Code does not appear to interact with an LLM or use prompts");
    }

    return true;
  };

  return { id, title, weight, question: questionHTML, answer };
}
