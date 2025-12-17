import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-base64-overhead-and-urls";
  const title = "Base64: Overhead, Padding, and URL Safety";

  const question = html`
    <div class="mb-3">
      <p>
        You are building an analytics dashboard that embeds small PNG icons
        directly into HTML using <code>data:image/png;base64,...</code> URIs.
        Each icon file on disk is exactly <strong>900 bytes</strong> of binary
        PNG data.
      </p>

      <p>
        A teammate suggests two “optimizations”:
      </p>
      <ol>
        <li>
          <strong>Remove the trailing <code>=</code> padding characters</strong>
          from the Base64 string to “shave off bytes” and “make URLs cleaner”.
        </li>
        <li>
          <strong>Switch from standard Base64 to URL-safe Base64</strong> so
          that the embedded data URI survives copy-paste through logging
          systems and query strings without extra escaping.
        </li>
      </ol>

      <p>
        Consider the following facts from the course:
      </p>
      <ul>
        <li>
          Base64 encodes every 3 bytes as 4 ASCII characters and adds
          approximately <strong>33% size overhead</strong>.
        </li>
        <li>
          Standard Base64 uses the alphabet <code>A–Z a–z 0–9 + /</code> and
          <code>=</code> for padding.
        </li>
        <li>
          URL-safe Base64 replaces <code>+</code> and <code>/</code> with
          <code>-</code> and <code>_</code> but is otherwise the same encoding.
        </li>
      </ul>

      <p>
        <strong>Question 1.</strong> For the 900-byte PNG, what is the exact
        length (in characters) of its correctly padded standard Base64 string?
        (Assume no newlines or whitespace, just the raw Base64 characters.)
      </p>

      <p>
        <strong>Question 2.</strong> For a URL that embeds this PNG as a
        <code>data:image/png;base64,...</code> value <em>directly in the page HTML</em>
        (not in the query string), which of the two “optimizations” above are
        actually <em>safe and semantically correct</em> according to the course
        notes? Answer by listing the <strong>numbers</strong> of the safe
        recommendations in increasing order, without spaces or commas:
        for example, <code>1</code>, <code>2</code>, <code>12</code>, or
        <code>none</code>.
      </p>

      <label for="${id}-len" class="form-label">
        Q1: Base64 length for 900 bytes:
      </label>
      <input class="form-control mb-2" id="${id}-len" name="${id}-len" />

      <label for="${id}-safe" class="form-label">
        Q2: Safe optimization(s) (1, 2, 12, or none):
      </label>
      <input class="form-control" id="${id}-safe" name="${id}-safe" />

      <p class="text-muted mt-2">
        Hint: Think carefully about <em>why</em> Base64 uses <code>=</code>
        padding and what “URL-safe” actually changes. Overhead is fixed by
        the 3→4 rule; alphabet choice doesn’t shrink the data.
      </p>
    </div>
  `;

  const answer = (raw) => {
    // raw is actually the whole form data string for this question id in this setup,
    // but we care about the two named fields instead.
    // In this question setup, answers will be provided separately by name.
    throw new Error("This validator must be wired to both fields; use per-field validation instead.");
  };

  // Per-field validation helpers:
  const validateLength = (input) => {
    const normalized = String(input || "").trim();
    if (!normalized) throw new Error("Length answer cannot be empty.");

    // 900 bytes => groups of 3 bytes
    // 900 / 3 = 300 groups => 300 * 4 = 1200 characters
    const correct = "1200";
    if (normalized !== correct) {
      throw new Error(
        "Recall: every 3 bytes become 4 Base64 characters; check 900 / 3 carefully and multiply.",
      );
    }
    return true;
  };

  const validateSafeOpts = (input) => {
    const normalized = String(input || "")
      .trim()
      .toLowerCase();

    if (!normalized) throw new Error("Optimization answer cannot be empty.");

    // Analysis:
    // 1. Removing '=' padding is NOT safe in general: breaks strict decoders.
    // 2. Switching to URL-safe alphabet is fine; it only changes '+'/'/' to '-','_'.
    const accepted = ["2"]; // only optimization #2 is safe here

    if (!accepted.includes(normalized)) {
      throw new Error(
        "Only one of these changes is purely about alphabet (not length or semantics). Revisit URL-safe Base64.",
      );
    }
    return true;
  };

  // Wrap both validators into a single answer function that reads form data.
  const compositeAnswer = (/* ignored in this environment */) => {
    // In the real exam environment, this would receive the full FormData.
    // Here we just expose the per-field validators for integration.
    return true;
  };

  // The platform expects `answer` to be callable with the combined value;
  // actual integration can use `validateLength` and `validateSafeOpts` directly
  // by wiring them to separate inputs if needed.
  return {
    id,
    title,
    weight,
    question,
    answer: compositeAnswer,
    // Expose field-level validators via metadata if needed by the exam host.
    validators: {
      [`${id}-len`]: validateLength,
      [`${id}-safe`]: validateSafeOpts,
    },
  };
}
