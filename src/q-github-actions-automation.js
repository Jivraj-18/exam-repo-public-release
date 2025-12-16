import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-github-actions-automation";
  const title = "GitHub Actions: Automated Data Collection";

  const random = seedrandom(`${user.email}#${id}`);

  const apis = [
    { name: "OpenWeatherMap", url: "https://api.openweathermap.org/data/2.5/weather", requires_key: true },
    { name: "Random User API", url: "https://randomuser.me/api/", requires_key: false },
    { name: "JSONPlaceholder", url: "https://jsonplaceholder.typicode.com/posts/1", requires_key: false },
    { name: "ISS Location", url: "http://api.open-notify.org/iss-now.json", requires_key: false },
    { name: "Advice Slip", url: "https://api.adviceslip.com/advice", requires_key: false },
    { name: "Dog API", url: "https://dog.ceo/api/breeds/image/random", requires_key: false },
  ];

  const selectedApi = apis.filter(api => !api.requires_key)[Math.floor(random() * apis.filter(api => !api.requires_key).length)];
  const frequency = ["daily", "weekly", "hourly"][Math.floor(random() * 3)];
  const cronExpressions = {
    daily: "0 12 * * *",
    weekly: "0 12 * * 0",
    hourly: "0 * * * *",
  };

  const answer = async (response) => {
    const url = response.trim();
    
    // Validate it's a GitHub URL
    if (!url.match(/^https:\/\/github\.com\/[^\/]+\/[^\/]+/)) {
      throw new Error("Please provide a valid GitHub repository URL (e.g., https://github.com/username/repo)");
    }

    // Try to fetch the workflow file
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error("Invalid GitHub URL format");
    
    const [, owner, repo] = match;
    const workflowUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/.github/workflows/data-collection.yml`;
    const workflowUrlMaster = `https://raw.githubusercontent.com/${owner}/${repo}/master/.github/workflows/data-collection.yml`;

    let workflowContent;
    try {
      const response1 = await fetch(workflowUrl);
      if (response1.ok) {
        workflowContent = await response1.text();
      } else {
        const response2 = await fetch(workflowUrlMaster);
        if (response2.ok) {
          workflowContent = await response2.text();
        } else {
          throw new Error("Workflow file not found at .github/workflows/data-collection.yml");
        }
      }
    } catch (error) {
      throw new Error(`Could not fetch workflow file. Ensure .github/workflows/data-collection.yml exists in your repo. Error: ${error.message}`);
    }

    // Validate workflow content
    if (!workflowContent.includes("schedule:") && !workflowContent.includes("workflow_dispatch:")) {
      throw new Error("Workflow must include either schedule or workflow_dispatch trigger");
    }

    if (!workflowContent.includes(user.email)) {
      throw new Error(`Workflow file must include your email address: ${user.email}`);
    }

    // Check for API fetch
    const apiKeywords = ["curl", "fetch", "requests", "http"];
    if (!apiKeywords.some(keyword => workflowContent.toLowerCase().includes(keyword))) {
      throw new Error("Workflow should fetch data from an API (use curl, requests, or similar)");
    }

    // Check for commit step
    if (!workflowContent.includes("git add") || !workflowContent.includes("git commit")) {
      throw new Error("Workflow should commit the data (include 'git add' and 'git commit' steps)");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DataStream: Automated Data Collection with GitHub Actions</h2>
      <p>
        DataStream is a data engineering company that collects time-series data from public APIs for analysis. Instead
        of manually running scripts, they use <strong>GitHub Actions</strong> to automate data collection workflows
        that run on a schedule.
      </p>

      <h3>Task</h3>
      <p>Create a GitHub repository with an automated workflow that:</p>
      <ol>
        <li>Runs on a schedule (use <code>workflow_dispatch</code> for manual testing)</li>
        <li>Fetches data from the <strong>${selectedApi.name}</strong> API: <code>${selectedApi.url}</code></li>
        <li>Appends the data to a file (e.g., <code>data.jsonl</code> or <code>data.csv</code>)</li>
        <li>Commits and pushes the changes back to the repository</li>
        <li>Includes your email <code>${user.email}</code> as a comment in the workflow file</li>
      </ol>

      <h3>Requirements</h3>
      <ul>
        <li>Workflow file location: <code>.github/workflows/data-collection.yml</code></li>
        <li>Must include <code>schedule:</code> or <code>workflow_dispatch:</code> trigger</li>
        <li>Use <code>uv</code>, <code>curl</code>, or Python <code>requests</code> to fetch API data</li>
        <li>Configure git to commit as GitHub Actions bot</li>
        <li>Ensure the workflow has write permissions (<code>contents: write</code>)</li>
      </ul>

      <h3>Workflow Structure Hints</h3>
      <ul>
        <li>Create file at: <code>.github/workflows/data-collection.yml</code></li>
        <li>Use <code>on: schedule:</code> or <code>workflow_dispatch:</code> as trigger</li>
        <li>Cron format: <code>"0 12 * * *"</code> runs daily at noon UTC</li>
        <li>Set <code>permissions: contents: write</code> to allow commits</li>
        <li>Use <code>actions/checkout@v4</code> to clone your repo</li>
        <li>Configure git with <code>git config user.name</code> before committing</li>
        <li>Test with "Run workflow" button before submitting</li>
      </ul>

      <h3>Helpful Resources</h3>
      <ul>
        <li><a href="https://docs.github.com/en/actions/writing-workflows/quickstart" target="_blank">GitHub Actions Quickstart</a></li>
        <li><a href="https://crontab.guru/" target="_blank">Crontab Guru (schedule syntax)</a></li>
        <li>Test your workflow using "Run workflow" button (workflow_dispatch)</li>
      </ul>

      <label for="${id}" class="form-label">
        Enter your GitHub repository URL (e.g., https://github.com/username/repo):
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="https://github.com/username/repo"
        required
      />
      <p class="text-muted">
        Make sure the repository is public and the workflow file exists at
        <code>.github/workflows/data-collection.yml</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
