import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "github-actions-ci-debug";
  const title = "GitHub Actions: Fixing a Broken CI Workflow";

  const answer = async (value) => {
    if (!value || typeof value !== "string") {
      throw new Error("Please submit the corrected GitHub Actions YAML.");
    }

    const yaml = value.toLowerCase();

    if (!yaml.includes("run tests")) {
      throw new Error(
        "Your workflow must still include the test execution step."
      );
    }

    if (yaml.includes("if: success") && !yaml.includes("success()")) {
      throw new Error(
        "Incorrect condition: GitHub Actions requires `success()` with parentheses."
      );
    }

    if (!yaml.includes("if: success()")) {
      throw new Error(
        "Missing condition: the test step must explicitly use `if: success()`."
      );
    }

    if (!yaml.includes("pytest")) {
      throw new Error(
        "The test step should execute `pytest` to run the test suite."
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Automated CI Pipeline for SkyTrack Services</h2>

      <h3>Context</h3>
      <p>
        <strong>SkyTrack</strong> is a cloud-based logistics analytics company.
        Every code change must pass automated tests before deployment.
      </p>

      <p>
        The engineering team uses <strong>GitHub Actions</strong> to run a CI
        pipeline whenever changes are pushed to the <code>main</code> branch.
        Recently, they noticed that while the pipeline executes successfully,
        <strong>tests are never run</strong>.
      </p>

      <h3>Current Workflow (Broken)</h3>

      <pre><code>
name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install -r requirements.txt

      - name: Run tests
        if: success
        run: |
          pytest tests/
      </code></pre>

      <h3>Your Task</h3>
      <p>
        Fix the workflow so that the test step runs correctly
        <strong>only after all previous steps succeed</strong>.
      </p>

      <p>
        You must:
      </p>
      <ul>
        <li>Keep the same workflow structure</li>
        <li>Correct the conditional logic</li>
        <li>Not remove the condition entirely</li>
      </ul>

      <h3>Submission Format</h3>
      <p>
        Paste the <strong>entire corrected GitHub Actions workflow YAML</strong>
        below.
      </p>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="18"
        placeholder="Paste the corrected workflow YAML here..."
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
