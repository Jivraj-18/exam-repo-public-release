import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-stream-normalization";
  const title = "JSON streaming and normalization";

  // Deterministic city selection
  const rng = seedrandom(`${user.email}#${id}`);
  const cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bengaluru"];
  const city = cities[Math.floor(rng() * cities.length)];

  const streamUrl =
    "https://sanand0.github.io/tdsdata/json_stream/temperature.ndjson";

  // Validator
  const answer = async (jsonText) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error("Submitted answer is not valid JSON.");
    }

    const response = await fetch(streamUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch JSON stream for validation.");
    }

    const text = await response.text();

    const expected = text
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line))
      .filter((row) => row.city === city)
      .map((row) => ({
        city: row.city,
        temperature: row.temp_c,
        timestamp: row.time,
      }));

    compareJSON(expected, parsed, { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Weather monitoring systems often publish data as
        <strong>newline-delimited JSON (NDJSON)</strong> streams for
        efficient processing.
      </p>

      <p>
        The URL below provides a temperature stream with one JSON object per line:
      </p>

      <pre><code>${streamUrl}</code></pre>

      <p>
        Each record contains <code>city</code>, <code>temp_c</code>, and
        <code>time</code>.
      </p>

      <h3>Your task</h3>
      <ol>
        <li>Fetch the NDJSON stream</li>
        <li>Parse each line as JSON</li>
        <li>
          Keep only records where <code>city === "${city}"</code>
        </li>
        <li>
          Normalize each record to the format:
          <pre><code class="json">{
  "city": "...",
  "temperature": number,
  "timestamp": "ISO string"
}</code></pre>
        </li>
        <li>Submit the final result as a JSON array</li>
      </ol>

      <label for="${id}" class="form-label">
        Normalized JSON array
      </label>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
