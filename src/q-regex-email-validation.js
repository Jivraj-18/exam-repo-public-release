import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

const emailCandidates = [
  "data.team@company.com",
  "alerts@sub.domain.io",
  "ml-ops+prod@company.ai",
  "ops@company",
  "engineer@company.c",
  "growth@company.toolongtld",
  "sales@@company.com",
  "notes@company.org",
  "analyst@data.company.co",
  "team lead@company.com",
];

const isValidEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/.test(email);

const normalizeList = (text) =>
  String(text || "")
    .split(/[,\\n]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.toLowerCase());

export default async function({ user, weight = 0.5 }) {
  const id = "q-regex-email-validation";
  const title = "Email validation sanity check";
  seedrandom(`${user.email}#${id}`); // deterministic prompt; no randomness required

  const expected = emailCandidates.filter(isValidEmail).map((e) => e.toLowerCase());

  const question = html`
    <div class="mb-3">
      <h4>Regex check for outbound alerts</h4>
      <p>
        You’re shipping an alerting tool and want a tight-but-practical email regex (no RFC 5322 edge cases). Which of
        these should pass a simple validation like
        <code>/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/</code>?
      </p>
      <pre><code>${emailCandidates.join("\\n")}</code></pre>
      <p>List only the valid addresses, comma- or newline-separated.</p>
      <label class="form-label" for="${id}">Valid addresses</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3" placeholder="email1@example.com, email2@example.com" required></textarea>
    </div>
  `;

  const answer = (value) => {
    const provided = normalizeList(value);
    if (!provided.length) throw new Error("Please list at least one address");

    const missing = expected.filter((e) => !provided.includes(e));
    const extras = provided.filter((e) => !expected.includes(e));
    if (missing.length || extras.length) {
      throw new Error(
        `Expected ${expected.join(", ")}; missing: ${missing.join(", ") || "none"}; extra: ${extras.join(", ") || "none"}`,
      );
    }
    return true;
  };

  return { id, title, weight, question, answer };
}

