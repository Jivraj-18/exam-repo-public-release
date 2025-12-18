import { html } from "lit";

export default async function question({ weight = 1 } = {}) {
  return {
    id: "q-json-schema-shipping",
    type: "code",
    weight,
    question: html`
      <h1>Structured Outputs: Strict Schema</h1>
      <p>
        You are defining an OpenAI function tool named <code>calculate_shipping</code> that requires 
        two arguments: <code>weight</code> (number) and <code>zip_code</code> (string).
      </p>
      <p>
        <strong>Task:</strong> Write the <code>parameters</code> JSON object for this function. 
        To satisfy <strong>Strict Mode</strong>, you must include the specific property that bans unknown fields.
      </p>
    `,
    answer: JSON.stringify({
      type: "object",
      properties: {
        weight: { type: "number" },
        zip_code: { type: "string" }
      },
      required: ["weight", "zip_code"],
      additionalProperties: false
    }, null, 2),
  };
}