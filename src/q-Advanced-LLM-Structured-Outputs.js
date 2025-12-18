import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-structured-output-advanced";
  const title = "Advanced LLM Structured Outputs";

  const answer = `"response_format": {
  "type": "json_schema",
  "json_schema": {
    "name": "sentiment_response",
    "strict": true,
    "schema": {
      "type": "object",
      "properties": {
        "sentiment": {
          "type": "string",
          "enum": ["GOOD", "BAD", "NEUTRAL"]
        }
      },
      "required": ["sentiment"],
      "additionalProperties": false
    }
  }
}`;

  const question = html`
    <div class="mb-3">
      <p>
        You are building an <strong>LLM-based sentiment analysis service</strong>
        using OpenAI’s Chat Completions API.
      </p>
      <p>
        The model must return a <strong>strictly validated JSON object</strong>
        containing only a single key <code>sentiment</code>, whose value must be
        one of <code>GOOD</code>, <code>BAD</code>, or <code>NEUTRAL</code>.
      </p>
      <p>
        Which <strong>response_format</strong> JSON block enforces this requirement
        using <strong>structured outputs with JSON Schema</strong>?
      </p>
      <label for="${id}" class="form-label">JSON schema block:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
