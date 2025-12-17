import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.5 }) {
  const id = "q-github-actions-scraper";
  const title = "GitHub Actions: Automated Data Collection Pipeline";

  const random = seedrandom(`${user.email}#${id}`);

  const apis = [
    {
      name: "ISS Location",
      url: "http://api.open-notify.org/iss-now.json",
      field: "iss_position",
      schedule: "0 */6 * * *",
      desc: "International Space Station position every 6 hours",
    },
    {
      name: "Exchange Rates",
      url: "https://api.exchangerate-api.com/v4/latest/USD",
      field: "rates",
      schedule: "0 0 * * *",
      desc: "Daily currency exchange rates at midnight",
    },
    {
      name: "Random User",
      url: "https://randomuser.me/api/",
      field: "results",
      schedule: "*/30 * * * *",
      desc: "Random user data every 30 minutes",
    },
    {
      name: "GitHub Events",
      url: "https://api.github.com/events",
      field: "length",
      schedule: "*/15 * * * *",
      desc: "Public GitHub events every 15 minutes",
    },
  ];

  const selectedApi = pick(apis, random);
  const commitCount = Math.floor(random() * 5) + 5; // 5-9 commits expected

  const question = html`
    <div class="mb-3">
      <h2>CI/CD: Automated Data Collection with GitHub Actions</h2>
      <p>
        GitHub Actions enables powerful automation workflows. Your task is to create a sophisticated data collection
        pipeline that runs on schedule, processes data, and commits results to a repository.
      </p>
      <h3>Task Requirements</h3>
      <p>Create a GitHub Actions workflow that:</p>
      <ol>
        <li>Runs on schedule: <code>${selectedApi.schedule}</code> (cron format)</li>
        <li>Fetches data from: <code>${selectedApi.url}</code></li>
        <li>
          Extracts the <code>${selectedApi.field}</code> field and appends it as a JSON line to
          <code>data-${id}.jsonl</code>
        </li>
        <li>
          Adds a timestamp field <code>collected_at</code> with ISO 8601 format to each record
        </li>
        <li>Commits the updated file with message format: <code>"Collect ${selectedApi.name} data [skip ci]"</code></li>
        <li>
          Includes proper error handling - if the API fails, log the error but don't fail the workflow
        </li>
        <li>Uses <code>uv</code> for Python dependency management</li>
        <li>Configures git user as <code>github-actions[bot]</code></li>
      </ol>
      <h3>Advanced Requirements</h3>
      <ul>
        <li>Workflow must run successfully at least <strong>${commitCount}</strong> times to demonstrate reliability</li>
        <li>Each commit must increment the file size (proving data was collected)</li>
        <li>Must handle rate limits gracefully with retry logic</li>
        <li>Repository must be public for verification</li>
      </ul>
      <h3>Example Workflow Structure</h3>
      <pre><code class="language-yaml">name: ${selectedApi.desc}

on:
  schedule:
    - cron: "${selectedApi.schedule}"
  workflow_dispatch:

jobs:
  collect:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: Collect data with error handling
        run: |
          uv run --with requests python << 'EOF'
          import requests
          import json
          from datetime import datetime

          try:
              response = requests.get("${selectedApi.url}", timeout=10)
              response.raise_for_status()
              data = response.json()

              record = {
                  "${selectedApi.field}": data.get("${selectedApi.field}"),
                  "collected_at": datetime.utcnow().isoformat() + "Z",
                  "email": "${user.email}"
              }

              with open("data-${id}.jsonl", "a") as f:
                  f.write(json.dumps(record) + "\\n")

              print(f"Successfully collected data at {record['collected_at']}")
          except Exception as e:
              print(f"Error collecting data: {e}")
              # Don't fail - log and continue
          EOF

      - name: Commit and push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data-${id}.jsonl
          git commit -m "Collect ${selectedApi.name} data [skip ci]" || echo "No changes"
          git push</code></pre>
      <p class="text-muted">
        <strong>Testing Tip:</strong> Use <code>workflow_dispatch</code> to manually trigger the workflow multiple times
        for testing. Don't wait for scheduled runs!
      </p>
      <label for="${id}" class="form-label">
        Enter your GitHub repository URL (format: https://github.com/username/repo-name)
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://github.com/username/data-collection"
        required
      />
      <p class="text-muted">
        Repository must be public and contain: (1) <code>.github/workflows/*.yml</code> with the workflow, (2)
        <code>data-${id}.jsonl</code> with at least ${commitCount} lines
      </p>
    </div>
  `;

  const answer = async (value) => {
    const repoUrl = String(value || "").trim();

    if (!repoUrl) {
      throw new Error("Repository URL is required");
    }

    // Parse GitHub URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub repository URL format");
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    // Check if repository exists and is public
    const repoApiUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`;
    const repoResp = await fetch(repoApiUrl);

    if (!repoResp.ok) {
      throw new Error(`Repository not found or not public: ${owner}/${cleanRepo}`);
    }

    const repoData = await repoResp.json();
    if (repoData.private) {
      throw new Error("Repository must be public for verification");
    }

    // Check for workflow file
    const workflowsUrl = `https://api.github.com/repos/${owner}/${cleanRepo}/contents/.github/workflows`;
    const workflowsResp = await fetch(workflowsUrl);

    if (!workflowsResp.ok) {
      throw new Error("No .github/workflows directory found. Please create a workflow file.");
    }

    const workflows = await workflowsResp.json();
    if (!Array.isArray(workflows) || workflows.length === 0) {
      throw new Error("No workflow files found in .github/workflows/");
    }

    // Check for data file
    const dataFileUrl = `https://api.github.com/repos/${owner}/${cleanRepo}/contents/data-${id}.jsonl`;
    const dataResp = await fetch(dataFileUrl);

    if (!dataResp.ok) {
      throw new Error(`Data file not found: data-${id}.jsonl. Ensure the workflow has run successfully.`);
    }

    const dataFile = await dataResp.json();

    // Download and verify the data file
    const contentResp = await fetch(dataFile.download_url);
    if (!contentResp.ok) {
      throw new Error("Unable to download data file for verification");
    }

    const content = await contentResp.text();
    const lines = content.trim().split("\n").filter((l) => l.trim());

    if (lines.length < commitCount) {
      throw new Error(
        `Data file has only ${lines.length} records. Need at least ${commitCount} to demonstrate reliability.`,
      );
    }

    // Verify JSON structure
    let validRecords = 0;
    for (const line of lines) {
      try {
        const record = JSON.parse(line);
        if (record.collected_at && record.email === user.email && record[selectedApi.field] !== undefined) {
          validRecords++;
        }
      } catch {
        // Invalid JSON line
      }
    }

    if (validRecords < commitCount) {
      throw new Error(
        `Only ${validRecords} valid records found. Each record must have: ${selectedApi.field}, collected_at, and email fields.`,
      );
    }

    // Check commit history
    const commitsUrl = `https://api.github.com/repos/${owner}/${cleanRepo}/commits?path=data-${id}.jsonl&per_page=${
      commitCount + 5
    }`;
    const commitsResp = await fetch(commitsUrl);

    if (commitsResp.ok) {
      const commits = await commitsResp.json();
      const actionCommits = commits.filter((c) =>
        c.commit.message.toLowerCase().includes(selectedApi.name.toLowerCase()),
      );

      if (actionCommits.length < commitCount) {
        throw new Error(
          `Only ${actionCommits.length} commits found matching the required message format. Need at least ${commitCount}.`,
        );
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
