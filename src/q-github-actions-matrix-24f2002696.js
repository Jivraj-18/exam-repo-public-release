import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-github-actions-matrix-24f2002696";
  const title = "GitHub Actions Matrix Testing Strategy";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints
  const pythonVersions = ["3.9", "3.10", "3.11", "3.12"];
  const minPythonVersion = pythonVersions[Math.floor(random() * 2)]; // 3.9 or 3.10
  const coverageOS = ["ubuntu-latest", "windows-latest"][Math.floor(random() * 2)];
  
  const question = html`
    <div class="mb-3">
      <h4>Multi-Environment CI/CD with Matrix Strategy</h4>
      <p>
        <strong>Scenario:</strong> PythonLibrary maintains a data processing package that must work 
        across multiple Python versions and operating systems.
      </p>
      <p>
        Create a GitHub Actions workflow (<code>.github/workflows/test-matrix.yml</code>) with the following requirements:
      </p>
      <ol>
        <li>
          Use matrix strategy to test across:
          <ul>
            <li>Python versions: <code>['${minPythonVersion}', '3.11', '3.12']</code></li>
            <li>Operating systems: <code>['ubuntu-latest', 'windows-latest', 'macos-latest']</code></li>
          </ul>
        </li>
        <li>Workflow triggers: <code>push</code>, <code>pull_request</code>, and <code>workflow_dispatch</code></li>
        <li>
          Job steps:
          <ul>
            <li>Checkout code</li>
            <li>Setup Python with matrix version</li>
            <li>Install dependencies using <code>uv</code> package manager</li>
            <li>Run tests with <code>pytest</code></li>
            <li>Include a step named <code>Test-24f2002696@ds.study.iitm.ac.in</code> that echoes your email</li>
          </ul>
        </li>
        <li>
          Upload coverage to Codecov <strong>only for ${coverageOS} + Python 3.12</strong> combination
        </li>
        <li>Add a job that runs <strong>after</strong> tests and summarizes results</li>
      </ol>
      <label for="${id}" class="form-label">Enter your GitHub repository URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" 
        placeholder="https://github.com/username/repo" />
      <p class="text-muted">
        We'll verify the workflow file exists and includes all required elements.
      </p>
    </div>
  `;

  const answer = async (repoUrl) => {
    if (!repoUrl) throw new Error("GitHub repository URL is required");
    const cleanUrl = repoUrl.trim().replace(/\/$/, "");
    
    // Extract repo info
    const match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL format. Expected: https://github.com/username/repo");
    }
    
    const [, owner, repo] = match;
    
    // Construct raw URL for workflow file
    const workflowUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/.github/workflows/test-matrix.yml`;
    
    let response;
    try {
      response = await fetch(workflowUrl);
    } catch (error) {
      // Try master branch
      const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/.github/workflows/test-matrix.yml`;
      try {
        response = await fetch(masterUrl);
      } catch {
        throw new Error("Could not fetch workflow file. Make sure .github/workflows/test-matrix.yml exists in main or master branch.");
      }
    }

    if (!response.ok) {
      throw new Error(`Workflow file not found. Create .github/workflows/test-matrix.yml in your repository.`);
    }

    const workflow = await response.text();

    // Check for email
    if (!workflow.includes("24f2002696@ds.study.iitm.ac.in")) {
      throw new Error("Workflow must include your email: 24f2002696@ds.study.iitm.ac.in");
    }

    // Check for required triggers
    const requiredTriggers = ["push", "pull_request", "workflow_dispatch"];
    for (const trigger of requiredTriggers) {
      if (!workflow.includes(trigger)) {
        throw new Error(`Workflow must trigger on: ${trigger}`);
      }
    }

    // Check for matrix strategy
    if (!workflow.includes("matrix:") && !workflow.includes("strategy:")) {
      throw new Error("Workflow must use matrix strategy");
    }

    // Check for Python versions
    const pythonVersionCheck = ["3.11", "3.12"].every(v => workflow.includes(v));
    if (!pythonVersionCheck) {
      throw new Error("Matrix must include Python versions: 3.11, 3.12");
    }

    // Check for OS
    const osCheck = ["ubuntu-latest", "windows-latest", "macos-latest"].every(os => workflow.includes(os));
    if (!osCheck) {
      throw new Error("Matrix must include OS: ubuntu-latest, windows-latest, macos-latest");
    }

    // Check for required steps
    const requiredSteps = [
      { pattern: /actions\/checkout|checkout/i, name: "checkout action" },
      { pattern: /actions\/setup-python|setup-python/i, name: "setup-python action" },
      { pattern: /pytest/i, name: "pytest command" },
      { pattern: /uv/i, name: "uv package manager" },
    ];

    for (const { pattern, name } of requiredSteps) {
      if (!pattern.test(workflow)) {
        throw new Error(`Workflow must include ${name}`);
      }
    }

    // Check for custom step name with email
    if (!workflow.includes("name:") || !workflow.match(/name:\s*Test-24f2002696@ds\.study\.iitm\.ac\.in/i)) {
      throw new Error("Workflow must include a step named: Test-24f2002696@ds.study.iitm.ac.in");
    }

    // Check for conditional codecov upload
    if (!workflow.includes("codecov") && !workflow.includes("coverage")) {
      throw new Error("Workflow must upload coverage to Codecov");
    }

    // Check for condition on codecov upload
    const hasConditional = workflow.includes("if:") && workflow.includes("matrix.") && workflow.includes("3.12");
    if (!hasConditional) {
      throw new Error(`Codecov upload must be conditional (only for ${coverageOS} + Python 3.12)`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
YAML solution sketch: .github/workflows/test-matrix.yml

name: Test Matrix CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  test:
    name: Test Python ${{ matrix.python-version }} on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    
    strategy:
      fail-fast: false
      matrix:
        python-version: ['3.10', '3.11', '3.12']
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      
      - name: Install uv
        run: pip install uv
      
      - name: Install dependencies
        run: uv pip install --system pytest pytest-cov
      
      - name: Test-24f2002696@ds.study.iitm.ac.in
        run: echo "Testing with email 24f2002696@ds.study.iitm.ac.in"
      
      - name: Run tests with coverage
        run: pytest --cov=. --cov-report=xml
      
      - name: Upload coverage to Codecov
        if: matrix.os == 'ubuntu-latest' && matrix.python-version == '3.12'
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage.xml
          fail_ci_if_error: false
  
  summary:
    name: Test Summary
    needs: test
    runs-on: ubuntu-latest
    if: always()
    
    steps:
      - name: Summary
        run: echo "All matrix tests completed"
*/