export default function ({ user, weight = 1.5 }) {
  const expectedIntent = "question";
  const requiredEntities = ["weather", "tomorrow"];

  return {
    id: "llm_intent_classification_json",
    type: "textarea",
    weight,

    placeholder: `{"intent":"question","confidence":0.9,"entities":["weather","tomorrow"]}`,

    label: "LLM Intent Classification (JSON-Only Output)",

    description: /* html */ `
      <h3>LLM Intent Classification</h3>

      <p>
        You are testing an LLM-based intent classification prompt.
        The goal is to ensure the model produces a <strong>strict JSON response</strong>
        for a known input.
      </p>

      <h4>Fixed Test Input</h4>
      <pre><code>What's the weather like tomorrow?</code></pre>

      <h4>Task</h4>
      <ol>
        <li>Write a prompt that forces JSON-only output</li>
        <li>Call any LLM (OpenAI, Anthropic, local LLM, etc.)</li>
        <li>Paste the <strong>raw JSON response only</strong> (no markdown)</li>
      </ol>

      <h4>Expected JSON Schema</h4>
      <pre><code>{
  "intent": "greeting | question | request | feedback | complaint",
  "confidence": 0.0 – 1.0,
  "entities": ["keywords", "..."]
}</code></pre>

      <p>
        The response must correctly classify the input as a <strong>question</strong>
        and extract meaningful entities.
      </p>
    `,

    help: [
      /* html */ `
      <p><strong>System prompt example:</strong></p>
      <pre><code>You are an intent classifier.
Respond ONLY with valid JSON.
Do not add explanations or markdown.</code></pre>

      <p><strong>Common mistakes:</strong></p>
      <ul>
        <li>Including markdown or prose</li>
        <li>Missing entities</li>
        <li>Confidence outside 0–1</li>
      </ul>
      `,
    ],

    check: ({ answer }) => {
      try {
        const response = JSON.parse(answer.trim());

        // Structural checks
        if (
          typeof response.intent !== "string" ||
          typeof response.confidence !== "number" ||
          !Array.isArray(response.entities)
        ) {
          return {
            pass: false,
            message: "✗ JSON structure invalid or missing fields",
          };
        }

        // Intent check
        if (response.intent.toLowerCase() !== expectedIntent) {
          return {
            pass: false,
            message: `✗ Intent must be "${expectedIntent}" for the given input`,
          };
        }

        // Confidence sanity check
        if (response.confidence < 0.5 || response.confidence > 1) {
          return {
            pass: false,
            message: "✗ Confidence should reasonably reflect certainty (≥ 0.5)",
          };
        }

        // Entity check (partial matching allowed)
        const entitiesLower = response.entities.map(e => e.toLowerCase());
        const missing = requiredEntities.filter(
          e => !entitiesLower.includes(e)
        );

        if (missing.length > 0) {
          return {
            pass: false,
            message: `✗ Missing expected entities: ${missing.join(", ")}`,
          };
        }

        return {
          pass: true,
          message: `✓ Correct intent classification with valid JSON output`,
        };
      } catch (e) {
        return {
          pass: false,
          message: "✗ Invalid JSON. Paste raw JSON only, no markdown or explanation.",
        };
      }
    },
  };
}
