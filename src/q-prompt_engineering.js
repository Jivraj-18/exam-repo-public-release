import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      id: "q-prompt_engineering",
      weight: 1,

      question: html`
        <h3>Deterministic Prompt Engineering for Tool-Based JSON Processing</h3>

        <p>
          Atlas Systems is building an internal automation workflow that relies on
          <strong>GPT-5 Nano</strong> for lightweight data processing tasks.
          The model is executed in a tool-enabled environment where it can
          fetch external URLs <em>only when explicitly instructed</em>.
        </p>

        <p>
          A remote endpoint returns JSON in the following structure:
        </p>

        <pre>
{
  "meta": {
    "source": "telemetry-v2",
    "rows": 5
  },
  "data": [
    { "id": "a1", "number": 10, "flag": "ok" },
    { "id": "a2", "number": null, "flag": "ok" },
    { "id": "a3", "number": 7, "flag": "ignore" },
    { "id": "a4", "number": 3, "flag": "ok" },
    { "id": "a5", "number": "N/A", "flag": "ok" }
  ]
}
        </pre>

        <p>
          Your task is to write a <strong>single prompt</strong> that will cause
          GPT-5 Nano to:
        </p>

        <ul>
          <li>Fetch the JSON from a provided URL.</li>
          <li>Process only objects inside <code>data[]</code>.</li>
          <li>Include a value in computation only if:
            <ul>
              <li><code>number</code> is a finite numeric value</li>
              <li><code>flag === "ok"</code></li>
            </ul>
          </li>
          <li>Compute the total sum of all qualifying numbers.</li>
        </ul>

        <p>
          The output must be returned <strong>strictly</strong> in the following format:
        </p>

        <pre>
{ "sum": &lt;number&gt; }
        </pre>

        <p>
          The prompt must explicitly prevent the model from:
        </p>

        <ul>
          <li>Explaining its reasoning</li>
          <li>Guessing values if the fetch fails</li>
          <li>Returning partial or approximate results</li>
          <li>Including any text outside the JSON object</li>
        </ul>

        <p>
          Assume the execution environment will request an <strong>AI Pipe token</strong>
          at runtime if required.
        </p>

        <p><strong>Task:</strong> Write the exact prompt text.</p>
      `,
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
