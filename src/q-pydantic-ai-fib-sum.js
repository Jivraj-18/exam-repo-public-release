import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-pydantic-ai-fib-sum";
  const title = "PydanticAI: Tool calling for Fibonacci summation";

  const question = html`
    <div class="mb-3">
      <h4>PydanticAI Tool Calling</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Write a Python code snippet using <strong>PydanticAI</strong> (or a similar structured tool-calling pattern) where:
      </p>
      <ol>
        <li>You define a tool/function that computes <code>sum(F0..Fn)</code> for a given <code>n</code>.</li>
        <li>The agent calls the tool (show tool registration + invocation).</li>
        <li>The final printed output includes the computed sum for a sample input (e.g. n=10).</li>
      </ol>
      <p class="text-muted">
        Submit code only. We grade by checking that the code includes tool-calling structure and mentions fibonacci summation.
      </p>
      <label class="form-label" for="${id}">Your code</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  const answer = async (code) => {
    const text = String(code || "").trim();
    expect(text.length > 0, "Code is required");

    // Tool calling heuristics (keep flexible)
    expect(
      /pydanticai/i.test(text) || /\bAgent\b/.test(text),
      "Code must reference PydanticAI (or an Agent pattern) explicitly",
    );
    expect(
      /\btool\b/i.test(text) || /@tool/i.test(text) || /tools\s*=/.test(text),
      "Code must define/register a tool (e.g., @tool or tools=...)",
    );
    expect(/fib/i.test(text), "Code must mention Fibonacci (fib)");
    expect(/sum/i.test(text), "Code must mention summation (sum)");

    return true;
  };

  return { id, title, weight, question, answer };
}
