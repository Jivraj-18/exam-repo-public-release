import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-normalization";
  const title = "JSON Processing: Nested Event Log Normalization";

  const question = html`
    <div class="mb-3">
      <h4>JSON Processing: Nested Event Log Normalization (1 mark)</h4>
      
      <h5>Problem Statement</h5>
      <p>
        You are given raw IoT event logs where sensor readings are deeply nested and inconsistent across devices. 
        The data must be normalized for downstream analytics.
      </p>

      <h5>Input</h5>
      <p>A JSON file <code>events.json</code> where:</p>
      <ul>
        <li>Each event contains:
          <ul>
            <li><code>device_id</code></li>
            <li><code>timestamp</code></li>
            <li><code>metrics</code> (nested object with variable keys)</li>
          </ul>
        </li>
      </ul>

      <h5>Constraints</h5>
      <ul>
        <li>Do not assume fixed metric names.</li>
        <li>Do not use pandas.</li>
        <li>Output must be deterministic.</li>
        <li>Missing metric values must be filled with <code>null</code>.</li>
      </ul>

      <h5>Task</h5>
      <ol>
        <li>Flatten the JSON so each metric becomes a column.</li>
        <li>Ensure all events share the same schema.</li>
        <li>Preserve event order.</li>
        <li>Export the normalized data.</li>
      </ol>

      <h5>Output</h5>
      <p>A CSV file <code>normalized_events.csv</code></p>
      <p>Columns:</p>
      <ul>
        <li><code>device_id</code></li>
        <li><code>timestamp</code></li>
        <li><code>&lt;dynamic metric columns&gt;</code></li>
      </ul>

      <label for="${id}" class="form-label">Upload your solution file</label>
      <input class="form-control" id="${id}" name="${id}" type="file" />
    </div>
  `;

  const answer = async (file) => {
    if (!file) throw new Error("Solution file is required");
    return true;
  };

  return { id, title, weight, question, answer };
}
