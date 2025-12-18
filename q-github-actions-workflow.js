import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-github-actions-workflow";
  const title = "GitHub Actions: CI/CD Workflow Creation";

  const random = seedrandom(`${user.email}#${id}`);

  // Different workflow requirements based on seed
  const pythonVersions = ["3.10", "3.11", "3.12", "3.13"];
  const testFrameworks = ["pytest", "unittest", "nose2"];
  const linters = ["ruff", "flake8", "black", "pylint"];
  
  const requiredPythonVersion = pythonVersions[Math.floor(random() * pythonVersions.length)];
  const requiredTestFramework = testFrameworks[Math.floor(random() * testFrameworks.length)];
  const requiredLinter = linters[Math.floor(random() * linters.length)];
  
  // Number of jobs required
  const minJobs = 2 + Math.floor(random() * 2);
  
  // Required triggers
  const requirePush = random() > 0.3;
  const requirePR = random() > 0.3;

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("raw.githubusercontent.com")) {
        throw new Error("URL should be from raw.githubusercontent.com");
      }

      // Fetch README.md
      const readmeResponse = await fetch(response);
      if (!readmeResponse.ok) {
        throw new Error("Could not fetch README.md from the provided URL");
      }

      const readmeText = await readmeResponse.text();
      if (!readmeText.includes(user.email)) {
        throw new Error("README.md must contain your email address");
      }

      // Extract repo info to fetch workflow file
      const urlParts = response.split("/");
      const username = urlParts[3];
      const repo = urlParts[4];
      const branch = urlParts[5];
      const folderPath = urlParts.slice(6, -1).join("/");

      const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}`;
      const workflowPath = folderPath ? `${folderPath}/.github/workflows` : ".github/workflows";

      // Try to fetch ci.yml, ci.yaml, or main.yml
      let workflowText = null;
      for (const filename of ["ci.yml", "ci.yaml", "main.yml", "test.yml"]) {
        try {
          const wfResponse = await fetch(`${baseUrl}/${workflowPath}/${filename}`);
          if (wfResponse.ok) {
            workflowText = await wfResponse.text();
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!workflowText) {
        throw new Error("Could not find workflow file. Expected .github/workflows/ci.yml or similar");
      }

      // Validate workflow content
      const workflowLower = workflowText.toLowerCase();

      // Check Python version
      if (!workflowText.includes(requiredPythonVersion)) {
        throw new Error(`Workflow must use Python ${requiredPythonVersion}`);
      }

      // Check for test framework
      if (!workflowLower.includes(requiredTestFramework.toLowerCase())) {
        throw new Error(`Workflow must use ${requiredTestFramework} for testing`);
      }

      // Check for linter
      if (!workflowLower.includes(requiredLinter.toLowerCase())) {
        throw new Error(`Workflow must use ${requiredLinter} for linting`);
      }

      // Check triggers
      if (requirePush && !workflowLower.includes("push")) {
        throw new Error("Workflow must trigger on push");
      }
      if (requirePR && !workflowLower.includes("pull_request")) {
        throw new Error("Workflow must trigger on pull_request");
      }

      // Count jobs (basic check)
      const jobMatches = workflowText.match(/^\s{2}\w+:/gm);
      if (jobMatches && jobMatches.length < minJobs) {
        throw new Error(`Workflow must have at least ${minJobs} jobs`);
      }

      return true;
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>CI/CD Pipeline: GitHub Actions Setup</h2>
      
      <p>
        <strong>DevOps Challenge:</strong> Your team is adopting GitHub Actions for continuous integration.
        Create a fully functional CI workflow that demonstrates your understanding of GitHub Actions
        YAML structure, job configuration, and Python tooling.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Create a GitHub repository with a <code>.github/workflows/ci.yml</code> file</li>
        <li>The workflow must:
          <ul>
            <li>Trigger on: ${requirePush ? html`<code>push</code>` : ""} ${requirePush && requirePR ? " and " : ""} ${requirePR ? html`<code>pull_request</code>` : ""}</li>
            <li>Use Python <strong>${requiredPythonVersion}</strong></li>
            <li>Run tests using <strong>${requiredTestFramework}</strong></li>
            <li>Run linting using <strong>${requiredLinter}</strong></li>
            <li>Have at least <strong>${minJobs} jobs</strong> (e.g., lint and test)</li>
          </ul>
        </li>
        <li>Create a <code>README.md</code> containing your email: <code>${user.email}</code></li>
      </ol>

      <h3>Expected Repository Structure</h3>
      <pre class="bg-dark text-light p-3"><code>your-repo/
├── .github/
│   └── workflows/
│       └── ci.yml        # Your CI workflow
├── README.md             # Must contain ${user.email}
├── requirements.txt      # Dependencies
└── test_*.py or tests/   # Test files</code></pre>

      <h3>Example Workflow Skeleton</h3>
      <pre class="bg-dark text-light p-3" style="font-size: 11px;"><code>name: CI Pipeline
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python ${requiredPythonVersion}
        uses: actions/setup-python@v5
        with:
          python-version: "${requiredPythonVersion}"
      - name: Install dependencies
        run: pip install ${requiredLinter}
      - name: Run ${requiredLinter}
        run: ${requiredLinter} .

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "${requiredPythonVersion}"
      - name: Install dependencies
        run: pip install ${requiredTestFramework}
      - name: Run tests
        run: ${requiredTestFramework === "pytest" ? "pytest" : requiredTestFramework === "unittest" ? "python -m unittest discover" : "nose2"}</code></pre>

      <label for="${id}" class="form-label">Enter the raw GitHub URL of your README.md file</label>
      <input class="form-control" id="${id}" name="${id}" type="url" required 
        placeholder="https://raw.githubusercontent.com/username/repo/main/README.md" />
      <p class="text-muted">
        We'll fetch your README.md and workflow file to validate the configuration.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

1. Create a new GitHub repository

2. Create .github/workflows/ci.yml with content like:

name: CI Pipeline
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install ruff
        run: pip install ruff
      - name: Run ruff
        run: ruff check .

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install pytest
        run: pip install pytest
      - name: Run tests
        run: pytest

3. Create README.md with your email

4. Create a simple test file (test_sample.py):
   def test_example():
       assert True

5. Submit the raw GitHub URL to README.md

*/
