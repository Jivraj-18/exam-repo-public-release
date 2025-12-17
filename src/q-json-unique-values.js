import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-unique-values";
  const title = "Extract Unique Nested Values from JSON";

  // Sample nested JSON input
  const data = [
    { id: 1, info: { tags: ["analytics", "data", "TDS"] } },
    { id: 2, info: { tags: ["data", "visualization", "TDS"] } },
    { id: 3, info: { tags: ["analytics", "Python", "tools"] } },
    { id: 4, info: { tags: ["Python", "data", "tools"] } },
    { id: 5, info: { tags: ["visualization", "analytics"] } }
  ];

  // Convert JSON to downloadable blob
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  // Validation function
  const answer = async (value) => {
    let parsed;
    try { parsed = JSON.parse(value); } 
    catch { throw new Error("Enter a valid JSON array."); }

    // Compute correct answer
    const allTags = data.flatMap(item => item.info.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();

    if (JSON.stringify(parsed.sort()) !== JSON.stringify(uniqueTags)) {
      throw new Error(`Incorrect. The correct unique tags are: ${JSON.stringify(uniqueTags)}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Extract Unique Nested Values from JSON</h2>
      <p>
        You are given a JSON array with nested <code>tags</code> arrays. Extract all unique tags across all items.
      </p>
      <p>
        Download the JSON file:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>
      <label for="${id}" class="form-label">
        Enter a JSON array of all unique tags (sorted alphabetically).
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Example: ["Python","TDS","analytics","data","tools","visualization"]</p>
    </div>
  `;

  return { id, title, weight, question, answer };
};
