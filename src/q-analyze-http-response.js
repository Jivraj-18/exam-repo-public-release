import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const id = "analyze-http-response-hard";

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
      <h3>Analyze HTTP Response</h3>
      <p>Make a request to:</p>
      <pre>https://jsonplaceholder.typicode.com/posts/1</pre>
      <p>Return:</p>
      <pre>{
  "status": number,
  "contentType": string
}</pre>
    `,

    evaluate(answer) {
      const data = normalizeAnswer(answer);
      if (!data || typeof data !== "object") return false;

      return (
        typeof data.status === "number" &&
        typeof data.contentType === "string"
      );
    }
  };
}
