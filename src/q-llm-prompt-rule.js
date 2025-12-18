import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-prompt-rule";
  const title = "LLM Prompt Engineering Rule";

  const random = seedrandom(`${user.email}#${id}`);

  // Personalized scenario
  const scenarios = [
    {
      context: "automated code generation",
      rule: "Never return None, null, or empty values",
      why: "it breaks the submission pipeline and prevents automated processing",
    },
    {
      context: "data extraction tasks",
      rule: "Always validate input format before processing",
      why: "it prevents errors from malformed data propagating through the system",
    },
    {
      context: "API response generation",
      rule: "Include error handling for all external calls",
      why: "it ensures graceful degradation when services are unavailable",
    },
  ];

  const selected = scenarios[Math.floor(random() * scenarios.length)];

  const answer = (input) => {
    const trimmed = input.trim().toLowerCase();
    const expected = selected.rule.toLowerCase();

    // Check for exact match or key phrases
    if (trimmed === expected) {
      return true;
    }

    // Check for key phrases that indicate the correct answer
    if (selected.rule.includes("None") && trimmed.includes("none") && trimmed.includes("null")) {
      return true;
    }
    if (selected.rule.includes("validate") && trimmed.includes("validate") && trimmed.includes("format")) {
      return true;
    }
    if (selected.rule.includes("error") && trimmed.includes("error") && trimmed.includes("handling")) {
      return true;
    }

    throw new Error(
      `Expected: "${selected.rule}". This is critical because ${selected.why}.`
    );
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>LLM System Design for AutoSolve</strong></h2>
      <p>
        <strong>AutoSolve</strong> is an automated problem-solving platform that
        uses Large Language Models to generate solutions for various tasks. The
        system must be robust and handle edge cases gracefully to ensure
        reliable operation in production.
      </p>

      <h3>Scenario</h3>
      <p>
        You are designing an LLM-powered system for
        <strong>${selected.context}</strong>. Based on lessons learned from
        production deployments, you need to implement critical safeguards to
        prevent common failure modes.
      </p>

      <h3>Your Task</h3>
      <p>
        What is the MOST important prompt engineering rule for this scenario?
        Write the complete rule as a single sentence.
      </p>

      <h3>Context</h3>
      <p>
        In ${selected.context}, the most critical failure mode occurs when
        ${selected.why}. Your prompt engineering rule should directly address
        this issue.
      </p>

      <h3>Hint</h3>
      <p>Think about what causes the most submission failures in automated systems.</p>

      <label for="${id}" class="form-label">
        Enter the most important rule:
      </label>
      <input
        type="text"
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="Always/Never..."
        required
      />
      <p class="text-muted">
        Your scenario is personalized based on: ${user.email}<br />
        Context: ${selected.context}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
