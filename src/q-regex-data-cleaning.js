import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-data-cleaning";
  const title = "RegEx: Data Cleaning and Validation";

  const rng = seedrandom(`${user.email}#${id}`);

  const names = [
    "John Smith",
    "Jane Doe",
    "Bob Johnson",
    "Alice Williams",
    "Charlie Brown",
    "Diana Martinez",
    "Eve Anderson",
    "Frank Wilson",
  ];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];

  const randomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
  const randomPick = (arr) => arr[Math.floor(rng() * arr.length)];

  // Generate messy contact data with various formatting issues
  const contacts = [];
  for (let i = 0; i < 50; i++) {
    const name = randomPick(names);
    const email = randomPick([
      // Valid emails
      `${name.toLowerCase().replace(" ", ".")}@${randomPick(domains)}`,
      // Emails with extra spaces
      ` ${name.toLowerCase().replace(" ", ".")}@${randomPick(domains)} `,
      // Emails with double dots
      `${name.toLowerCase().replace(" ", "..")}@${randomPick(domains)}`,
      // Missing @ symbol (invalid)
      `${name.toLowerCase().replace(" ", ".")}${randomPick(domains)}`,
    ]);

    // Phone with various formats
    const phone = randomPick([
      `(555) ${randomInt(100, 999)}-${randomInt(1000, 9999)}`, // Valid format
      `555-${randomInt(100, 999)}-${randomInt(1000, 9999)}`, // Valid format
      `555.${randomInt(100, 999)}.${randomInt(1000, 9999)}`, // Needs cleaning
      `+1 555 ${randomInt(100, 999)} ${randomInt(1000, 9999)}`, // Needs cleaning
      `555${randomInt(100, 999)}${randomInt(1000, 9999)}`, // No separators
      `tel:555-${randomInt(100, 999)}-${randomInt(1000, 9999)}`, // Has prefix
    ]);

    // IDs with inconsistent formatting
    const customerId = randomPick([
      `CUST-${String(randomInt(1000, 9999)).padStart(5, "0")}`, // Valid
      `cust-${randomInt(1000, 9999)}`, // Lowercase
      `CUST${randomInt(1000, 9999)}`, // Missing dash
      `  CUST-${randomInt(1000, 9999)}  `, // Extra spaces
      `CUST_${randomInt(1000, 9999)}`, // Wrong separator
    ]);

    contacts.push({
      customer_id: customerId,
      name: name,
      email: email,
      phone: phone,
      account_status: randomPick(["active", "ACTIVE", "Active", "inactive"]),
    });
  }

  // Create the "dirty" JSON
  const dirtyJson = JSON.stringify(contacts, null, 2);

  // Create cleaned version for validation
  const cleanedContacts = contacts.map((c) => {
    // Clean customer_id: uppercase, CUST- prefix, 5 digits
    let cleanId = c.customer_id.trim().toUpperCase().replace(/[_\s]/g, "-");
    if (!cleanId.startsWith("CUST-")) {
      cleanId = cleanId.replace(/^CUST/, "CUST-");
    }
    const idMatch = cleanId.match(/CUST-?(\d+)/);
    cleanId = idMatch ? `CUST-${idMatch[1].padStart(5, "0")}` : cleanId;

    // Clean email: trim, lowercase, single dots, must have @
    let cleanEmail = c.email.trim().toLowerCase().replace(/\.+/g, ".");
    if (!cleanEmail.includes("@")) {
      cleanEmail = ""; // Invalid, mark as empty
    }

    // Clean phone: extract digits, format as XXX-XXX-XXXX
    const phoneDigits = c.phone.replace(/\D/g, "");
    const last10 = phoneDigits.slice(-10);
    const cleanPhone =
      last10.length === 10
        ? `${last10.slice(0, 3)}-${last10.slice(3, 6)}-${last10.slice(6)}`
        : c.phone;

    // Normalize status to lowercase
    const cleanStatus = c.account_status.toLowerCase();

    return {
      customer_id: cleanId,
      name: c.name,
      email: cleanEmail,
      phone: cleanPhone,
      account_status: cleanStatus,
    };
  });

  const blob = new Blob([dirtyJson], { type: "application/json" });

  const question = html`
    <div class="mb-3">
      <h2>RegEx: Clean and Validate Contact Data</h2>
      <p>
        You have been given a JSON file containing customer contact information
        with inconsistent formatting. Your task is to use regular expressions to
        clean and standardize the data.
      </p>

      <h3>Data Issues to Fix</h3>
      <ul>
        <li>
          <strong>Customer IDs:</strong> Should be formatted as
          <code>CUST-XXXXX</code> (uppercase, dash separator, 5 digits padded
          with zeros)
        </li>
        <li>
          <strong>Emails:</strong> Should be trimmed, lowercase, with single
          dots (no double dots), and must contain @ symbol
        </li>
        <li>
          <strong>Phone Numbers:</strong> Should be formatted as
          <code>XXX-XXX-XXXX</code> (extract 10 digits, format with dashes)
        </li>
        <li>
          <strong>Account Status:</strong> Should be lowercase (active or
          inactive)
        </li>
      </ul>

      <h3>Tasks</h3>
      <ol>
        <li>Download the JSON file and load it into your code</li>
        <li>Write regex patterns to identify and fix each formatting issue</li>
        <li>Clean all records using regex replacements</li>
        <li>Remove or mark invalid entries (e.g., emails without @ symbol)</li>
        <li>Export the cleaned JSON data</li>
      </ol>

      <p>
        Download the messy contact data:
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          @click=${() => download(blob, "contacts_dirty.json")}
        >
          Download contacts_dirty.json
        </button>
      </p>

      <label for="${id}" class="form-label">
        <strong>Cleaned JSON Data:</strong> Paste your cleaned JSON (must be
        valid JSON with all formatting corrections applied)
      </label>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="10"
        placeholder='[&#10;  {&#10;    "customer_id": "CUST-01234",&#10;    "email": "john.smith@gmail.com",&#10;    ...&#10;  }&#10;]'
        required
      ></textarea>
    </div>
  `;

  const answer = (input) => {
    const cleanedJson = input.trim();

    // Verify JSON structure
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedJson);
    } catch (e) {
      throw new Error("Submitted data is not valid JSON");
    }

    if (!Array.isArray(parsedData)) {
      throw new Error("JSON should be an array of contact objects");
    }

    if (parsedData.length === 0) {
      throw new Error("Cleaned data should not be empty");
    }

    // Validate each record against required patterns
    const idPattern = /^CUST-\d{5}$/;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const emailPattern = /^[^@\s]+@[^@\s]+$/; // allow empty string as removal

    for (const rec of parsedData) {
      if (!rec.customer_id || !rec.phone || rec.email === undefined) {
        throw new Error(
          "Each record must include customer_id, phone, and email fields"
        );
      }

      if (!idPattern.test(rec.customer_id)) {
        throw new Error(
          `Invalid customer_id: ${rec.customer_id}. Expect CUST-XXXXX`
        );
      }

      if (!phonePattern.test(rec.phone)) {
        throw new Error(`Invalid phone: ${rec.phone}. Expect XXX-XXX-XXXX`);
      }

      if (rec.email !== "" && !emailPattern.test(rec.email)) {
        throw new Error(
          `Invalid email: ${rec.email}. Must be lowercase, no spaces, and contain @`
        );
      }

      if (
        rec.account_status &&
        !["active", "inactive"].includes(
          String(rec.account_status).toLowerCase()
        )
      ) {
        throw new Error(
          `account_status must be 'active' or 'inactive' (lowercase). Got: ${rec.account_status}`
        );
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
