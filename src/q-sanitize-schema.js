import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sanitize-schema";
  const title = "Security: Sanitize user-provided JSON Schema";

  const random = seedrandom(`${user.email}#${id}`);

  // Example dangerous schema with external refs and other risky keywords
  const schema = {
    $id: "https://example.com/schemas/customer.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: { type: "string" },
      profile: { $ref: "http://remote.example.com/schemas/profile.json" },
      settings: {
        type: "object",
        unevaluatedProperties: false,
        patternProperties: {
          "^x-": { $ref: "https://evil.com/x-schema.json" }
        }
      }
    }
  };

  const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" });

  // Count external $ref (http or https)
  const findExternalRefs = (obj) => {
    let count = 0;
    if (Array.isArray(obj)) {
      obj.forEach((o) => (count += findExternalRefs(o)));
    } else if (obj && typeof obj === "object") {
      for (const k of Object.keys(obj)) {
        if (k === "$ref" && typeof obj[k] === "string" && /^(https?:)\/\//i.test(obj[k])) count++;
        count += findExternalRefs(obj[k]);
      }
    }
    return count;
  };

  const expectedRemoved = findExternalRefs(schema);

  const answer = async (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) throw new Error("Enter the number of external $ref entries removed (integer)");
    if (num !== expectedRemoved) throw new Error(`Expected ${expectedRemoved} external $ref entries to be removed`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Sanitize JSON Schema</h2>
      <p>
        A user-submitted JSON Schema can contain dangerous directives that may cause remote dereferences, SSRF, or
        other security issues. Your sanitizer must:
      </p>
      <ul>
        <li>Remove any <code>$ref</code> values pointing at external HTTP or HTTPS URLs.</li>
        <li>Disallow remote fetching by removing or rewriting dangerous constructs.</li>
        <li>Return a report describing what was changed.</li>
      </ul>

      <p>Download the example schema and run your sanitizer locally:</p>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>

      <label for="${id}" class="form-label">How many external <code>$ref</code> entries did you remove?</label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Count only refs that begin with <code>http://</code> or <code>https://</code>.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Notes: In production, replace external refs with internal resolved copies or require an allowlist. */