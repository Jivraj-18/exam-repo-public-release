import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-regex-invoice-extractor";
  const title = "Text Processing: Invoice ID Extraction";

  const random = seedrandom(`${user.email}#${id}`);

  const templates = [
    (id) => `Ref: ${id} processed successfully.`,
    (id) => `Error processing invoice #${id}.`,
    (id) => `Invoice: ${id}`,
    (id) => `Payment received for ${id} yesterday.`
  ];

  const lines = [];
  const targetPrefix = "INV-2024";
  let targetCount = 0;

  for (let i = 0; i < 50; i++) {
    const isTarget = random() < 0.3;
    const suffix = String(Math.floor(random() * 1000)).padStart(3, '0');
    // Random prefix (some match target, some don't)
    const prefix = isTarget ? targetPrefix : (random() < 0.5 ? "INV-2023" : "EST-2024");
    
    const invoiceId = `${prefix}-${suffix}`;
    const template = pick(templates, random);
    
    lines.push(template(invoiceId));

    if (prefix === targetPrefix) {
      targetCount++;
    }
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });

  const answer = async (value) => {
    if (Number(value) !== targetCount) throw new Error("Incorrect count of 2024 invoices.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="invoice-extraction">Data Entry: Invoice ID Scraping</h2>
      <p>
        We have a dump of system messages. We need to count how many unique invoices from the year 2024 are mentioned.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the text file.</li>
        <li>Find all strings matching the pattern <code>${targetPrefix}-XXX</code> (where X is a digit).</li>
        <li>Count the total number of occurrences.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.txt`)}>
          ${id}.txt
        </button>
      </p>
      <label for="${id}" class="form-label">
        Count of invoices starting with ${targetPrefix}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}