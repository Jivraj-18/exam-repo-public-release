import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-data-cleaning-regex";
  const title = "Data Cleaning with Regex and Text Processing";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate messy customer data
  const firstNames = ["John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Eve", "Frank"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "company.com"];

  const generateMessyEmail = () => {
    const base = `${pick(firstNames).toLowerCase()}${randInt(1, 999)}`;
    const domain = pick(domains);
    const variants = [
      `  ${base}@${domain}  `, // whitespace
      `${base.toUpperCase()}@${domain}`, // uppercase
      `${base}@${domain.toUpperCase()}`, // uppercase domain
      `  ${base}@${domain}`, // leading space
      `${base}@${domain}  `, // trailing space
    ];
    return pick(variants);
  };

  const generateMessyPhone = () => {
    const area = randInt(200, 999);
    const prefix = randInt(200, 999);
    const line = randInt(1000, 9999);
    const formats = [
      `(${area}) ${prefix}-${line}`,
      `${area}-${prefix}-${line}`,
      `${area}.${prefix}.${line}`,
      `${area} ${prefix} ${line}`,
      `+1-${area}-${prefix}-${line}`,
      `${area}${prefix}${line}`,
    ];
    return pick(formats);
  };

  const customers = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    email: generateMessyEmail(),
    phone: generateMessyPhone(),
    name: `  ${pick(firstNames)} ${pick(lastNames)}  `,
  }));

  // Expected: count of valid gmail.com emails after cleaning
  const cleanedEmails = customers.map(c => c.email.trim().toLowerCase());
  const gmailCount = cleanedEmails.filter(email => email.endsWith("@gmail.com")).length;

  const answer = (input) => {
    const value = parseInt(input, 10);
    if (isNaN(value)) throw new Error("Answer must be an integer");
    if (value === gmailCount) return true;
    throw new Error(`Expected ${gmailCount} gmail.com emails, got ${value}`);
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're cleaning a customer database with inconsistent formatting. The data contains emails with various 
        formatting issues (whitespace, mixed case) and phone numbers in multiple formats.
      </p>
      <h5>Customer Data (Messy):</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(customers, null, 2)}
      </code></pre>
      <h5>Task:</h5>
      <ol>
        <li>Clean all email addresses: remove leading/trailing whitespace and convert to lowercase</li>
        <li>Count how many customers have <strong>gmail.com</strong> email addresses</li>
        <li>Use Python/pandas with string methods: <code>str.strip()</code>, <code>str.lower()</code></li>
        <li>Filter emails ending with "@gmail.com"</li>
      </ol>
      <p class="text-muted">
        Example: "  John99@GMAIL.COM  " should become "john99@gmail.com"
      </p>
      <label for="${id}" class="form-label">Number of gmail.com customers:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
