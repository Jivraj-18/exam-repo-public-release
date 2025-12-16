import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

const expectedData = [
  { sku: "A12", name: "USB-C Hub", price: 39.99, category: "accessories" },
  { sku: "B07", name: "Noise-Cancelling Headphones", price: 129.5, category: "audio" },
  { sku: "C55", name: "4K Monitor", price: 329.0, category: "displays" },
];

const normalize = (data) =>
  data.map((item) => ({
    sku: String(item.sku),
    name: String(item.name),
    price: Number(item.price),
    category: String(item.category),
  }));

export default async function({ user, weight = 0.5 }) {
  const id = "q-csv-to-json";
  const title = "Convert a small CSV to clean JSON";
  seedrandom(`${user.email}#${id}`); // deterministic prompt only

  const csv = `sku,name,price,category
A12,USB-C Hub,39.99,accessories
B07,Noise-Cancelling Headphones,129.5,audio
C55,4K Monitor,329.0,displays`;

  const question = html`
    <div class="mb-3">
      <h4>Multi-cursor/CLI to JSON</h4>
      <p>
        Convert this CSV snippet into a JSON array where <code>price</code> stays numeric. Use any tool: multi-cursor in
        VS Code, <code>csvtojson</code>, Python, Sheets, etc.
      </p>
      <pre><code>${csv}</code></pre>
      <label class="form-label" for="${id}">JSON array</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" placeholder='[{"sku":"A12","name":"..."}]' required></textarea>
      <p class="text-muted">Order should match the CSV.</p>
    </div>
  `;

  const answer = (value) => {
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error("Response is not valid JSON");
    }

    if (!Array.isArray(parsed)) throw new Error("Response must be a JSON array");
    if (parsed.length !== expectedData.length) throw new Error(`Expected ${expectedData.length} rows`);

    const normalized = normalize(parsed);
    const expected = normalize(expectedData);
    expected.forEach((row, idx) => {
      const got = normalized[idx];
      if (row.sku !== got.sku || row.name !== got.name || row.category !== got.category) {
        throw new Error(`Row ${idx + 1} does not match the CSV values`);
      }
      if (Number.isNaN(got.price) || got.price !== row.price) {
        throw new Error(`Row ${idx + 1} has an incorrect or non-numeric price`);
      }
    });
    return true;
  };

  return { id, title, weight, question, answer };
}

