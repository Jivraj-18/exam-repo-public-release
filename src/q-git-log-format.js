import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-log-format";
  const title = "Git Log Custom Formatting";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate personalized git command requirements
  const fields = ["hash", "author", "date", "subject"];
  const selectedFields = [];
  const fieldCount = Math.floor(random() * 2) + 2; // 2 or 3 fields

  // Randomly select fields
  const shuffled = fields.sort(() => random() - 0.5);
  for (let i = 0; i < fieldCount; i++) {
    selectedFields.push(shuffled[i]);
  }

  const formatMap = {
    hash: "%h",
    author: "%an",
    date: "%ar",
    subject: "%s",
  };

  const expectedFormat = selectedFields.map((f) => formatMap[f]).join(" - ");

  const answer = (input) => {
    const trimmed = input.trim();
    const normalized = trimmed.replace(/\s+/g, " ");
    const expectedNormalized = expectedFormat.replace(/\s+/g, " ");

    if (normalized === expectedNormalized) {
      return true;
    }

    throw new Error(
      `Expected format: ${expectedFormat}. You provided: ${trimmed}. Make sure to use the correct placeholders and separators.`
    );
  };

  const fieldDescriptions = {
    hash: "abbreviated commit hash",
    author: "author name",
    date: "relative date",
    subject: "commit subject",
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Version Control Analytics for DevTrack</strong></h2>
      <p>
        <strong>DevTrack</strong> is a software development analytics platform
        that helps teams understand their development patterns and improve
        productivity. The platform analyzes Git repositories to provide insights
        into commit frequency, author contributions, and project evolution.
      </p>
      <p>
        As a data engineer at DevTrack, you need to extract structured commit
        information from Git repositories in a consistent format. This data will
        be processed and visualized to show team activity patterns over time.
      </p>

      <h3>Your Task</h3>
      <p>
        Create a Git log format string using
        <code>--pretty=format:"..."</code> that displays the following fields in
        order, separated by <code> - </code> (space-dash-space):
      </p>
      <ol>
        ${selectedFields.map(
          (field) => html`<li><strong>${field}</strong>: ${fieldDescriptions[field]}</li>`
        )}
      </ol>

      <h3>Requirements</h3>
      <ul>
        <li>Use standard Git pretty-format placeholders</li>
        <li>Separate each field with exactly <code> - </code></li>
        <li>Do NOT include quotes in your answer</li>
        <li>Only provide the format string (what goes after <code>--pretty=format:</code>)</li>
      </ul>

      <h3>Example</h3>
      <p>
        If asked for "hash - author", you would submit: <code>%h - %an</code>
      </p>

      <p><strong>Common Git format placeholders:</strong></p>
      <ul>
        <li><code>%h</code> - abbreviated commit hash</li>
        <li><code>%H</code> - full commit hash</li>
        <li><code>%an</code> - author name</li>
        <li><code>%ae</code> - author email</li>
        <li><code>%ar</code> - author date, relative</li>
        <li><code>%s</code> - commit subject</li>
      </ul>

      <label for="${id}" class="form-label">
        Enter your format string (without quotes):
      </label>
      <input
        type="text"
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        placeholder="%h - %an - ..."
        required
      />
      <p class="text-muted">
        This format will be used to extract commit data for analysis. Your
        email: ${user.email}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
