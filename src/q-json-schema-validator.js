import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-schema-validator";
    const title = "JSON Schema Validator";

    const random = seedrandom(`${user.email}#${id}`);

    const users = [
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "user" },
        { id: 3, name: "Charlie", role: "user" },
        { id: 4, name: "Dave", role: "user" },
        { id: 5, name: "Eve", role: "admin" }
    ];

    // Introduce a flaw
    // Possible flaws: missing id, missing name, invalid role, or extra field
    const flawType = Math.floor(random() * 3);
    const flawIndex = Math.floor(random() * users.length);
    const targetUser = { ...users[flawIndex] };

    if (flawType === 0) {
        delete targetUser.id; // Missing ID
    } else if (flawType === 1) {
        delete targetUser.name; // Missing Name
    } else {
        targetUser.role = "super-admin"; // Invalid role (only admin/user allowed)
    }

    // Clone array and replace
    const dataset = JSON.parse(JSON.stringify(users));
    dataset[flawIndex] = targetUser;

    const answer = (input) => {
        const submission = Number(input.trim());
        if (isNaN(submission)) throw new Error("Input is not a number");
        if (submission !== flawIndex) return false;
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        You have a list of User objects. Each user must have:
      </p>
      <ul>
        <li><code>id</code> (number)</li>
        <li><code>name</code> (string)</li>
        <li><code>role</code> (either "admin" or "user")</li>
      </ul>
      <p>
        Identify the <strong>zero-based index</strong> of the object that violates this schema.
      </p>
      <pre style="white-space: pre-wrap; background-color: #f0f0f0; padding: 10px; border-radius: 5px;"><code>${JSON.stringify(dataset, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Index of Invalid Object:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
