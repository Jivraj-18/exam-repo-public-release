import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-test-first";
  const title = "Premortem test: catch the ZeroDivision bug";

  // Fixed example code with a subtle bug: returns 0 instead of raising on division by zero
  const example = `def safe_div(a, b):
    """Return a/b, but this implementation returns 0 when b == 0 (bug)."""
    if b == 0:
        return 0
    return a / b
`;

  const prompt = html`
    <div class="mb-3">
      <p><strong>Premortem test</strong></p>
      <p>
        You are given the following Python function <code>safe_div</code> which contains a bug: when <code>b == 0</code>
        it returns 0 instead of raising an exception. As part of a test-first workflow, write a <strong>pytest</strong>
        test that demonstrates the bug (i.e., the test should fail against the buggy implementation). Paste your
        test code into the box below. Your test should use <code>pytest</code> constructs (for example,
        <code>with pytest.raises(...)</code> or an assert that will fail against the buggy function).
      </p>
      <pre><code>${example}</code></pre>
      <label for="${id}" class="form-label">Paste your pytest code that fails on the buggy implementation</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
      <p class="text-muted">Tip: a good failing test explicitly asserts the expected exception on division by zero.</p>
    </div>
  `;

  const answer = async (text) => {
    if (!text || !text.trim()) throw new Error("No test submitted");
    const lower = text.toLowerCase();
    if (lower.includes("pytest.raises") || lower.includes("with pytest.raises")) return true;
    // Allow a test that asserts a wrong numeric result (e.g. assert safe_div(1,0) == 0) as a failing test
    if (/assert\s+.*safe_div\s*\(/.test(text) && /==\s*0/.test(text)) return true;
    throw new Error("Test does not appear to demonstrate the division-by-zero failure. Use pytest.raises or assert failing condition.");
  };

  return { id, title, weight, question: prompt, answer };
}
