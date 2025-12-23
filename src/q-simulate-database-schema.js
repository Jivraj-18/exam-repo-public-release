import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const id = "simulate-database-schema-hard";

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
      <h3>Database Schema Design</h3>
      <p>Design a schema for an <b>Online Shopping System</b>.</p>
      <pre>{
  "users": ["id", "name", "email"],
  "orders": ["id", "user_id", "total"]
}</pre>
    `,

    evaluate(answer) {
      const data = normalizeAnswer(answer);
      if (!data || typeof data !== "object") return false;

      const tables = Object.values(data);
      if (tables.length < 2) return false;

      return tables.every(
        fields => Array.isArray(fields) && fields.length >= 3
      );
    }
  };
}
