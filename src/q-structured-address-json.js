import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-structured-address-json";
  const title = "Structured Address Generation";

  const answer = `{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "Respond in JSON" },
    { "role": "user", "content": "Generate 8 random addresses in the US" }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "address_response",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "addresses": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "street": { "type": "string" },
                "city": { "type": "string" },
                "county": { "type": "string" },
                "state": { "type": "string" }
              },
              "required": ["street", "city", "county", "state"],
              "additionalProperties": false
            }
          }
        },
        "required": ["addresses"],
        "additionalProperties": false
      }
    }
  }
}`;

  const question = html`
    <div class="mb-3">
      <p>
        RouteGrid Logistics wants to auto-generate realistic US test addresses for
        their routing simulator. They use <code>gpt-4o-mini</code> with
        <strong>structured outputs</strong> to ensure every address follows a strict JSON schema.
      </p>
      <p>
        Write the <strong>JSON body only</strong> (no URL or headers) for a
        <code>chat/completions</code> request that:
      </p>
      <ul>
        <li>Uses model <code>gpt-4o-mini</code>.</li>
        <li>Has a system message: <code>Respond in JSON</code>.</li>
        <li>Has a user message: <code>Generate 8 random addresses in the US</code>.</li>
        <li>
          Uses <code>response_format</code> with <code>type: "json_schema"</code> and
          a schema named <code>address_response</code>.
        </li>
        <li>
          Returns an object with a single property <code>addresses</code>, an array of
          objects each having required fields:
          <code>street</code>, <code>city</code>, <code>county</code>, <code>state</code>
          (all strings).
        </li>
        <li>
          Sets <code>additionalProperties</code> to <code>false</code> on all objects in the schema.
        </li>
      </ul>
      <p>Put your complete JSON body below.</p>
      <label for="${id}" class="form-label">JSON body:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="12"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
