import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-jq-extract-email";
  const title = "JQ Email Extraction";
  const random = seedrandom(`${user.email}#${id}`);

  const sampleData = [
    { id: 1, user: { profile: { email: "alice@example.com" } } },
    { id: 2, user: { profile: { email: "bob@test.org" } } }
  ];

  const question = html`
    <p>You have a JSON file <code>users.json</code> with the following structure:</p>
    <pre><code>${JSON.stringify(sampleData, null, 2)}</code></pre>
    <p>You want to output a simple list of email strings using the command-line tool <strong>jq</strong>.</p>
    <p>Which <code>jq</code> filter string would produce the output:</p>
    <pre><code>"alice@example.com"\n"bob@test.org"</code></pre>
    <p>Provide the filter expression only (e.g., <code>.users[] | .name</code>).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Data Preparation > JSON Tools > jq
    check: (answer) => {
      const ans = String(answer).trim().replace(/\s+/g, '');
      // Accepted variations: .[].user.profile.email or map(.user.profile.email)[]
      const valid = [
        ".[].user.profile.email",
        "map(.user.profile.email)[]",
        ".[]|.user.profile.email"
      ];
      if (valid.includes(ans)) return true;
      throw new Error("Incorrect filter. Try iterating over the array and accessing the nested path.");
    },
    weight,
  };
}
