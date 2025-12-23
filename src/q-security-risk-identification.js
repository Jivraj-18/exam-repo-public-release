import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const id = "security-risk-identification-hard";

function normalizeAnswer(answer) {
  if (typeof answer === "string") {
    try { return JSON.parse(answer); } catch { return null; }
  }
  return answer;
}

export default async function ({ user, weight = 1 }) {
  return {
    id,
    weight,

    question: html`
      <h3>Identify Security Risks</h3>
      <p>List at least <b>2 security risks</b> and prevention methods.</p>
      <pre>[
  { "risk": string, "prevention": string }
]</pre>
    `,

    evaluate(answer) {
      const data = normalizeAnswer(answer);
      if (!Array.isArray(data) || data.length < 2) return false;

      return data.every(
        r =>
          typeof r.risk === "string" &&
          typeof r.prevention === "string"
      );
    }
  };
}
