/**
 * Question 5: GitHub Actions Matrix Build Strategy
 * Topic: CI/CD - GitHub Actions
 * Marks: 1.0
 * GA: GA2 (Deployment Tools)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.0 }) {
  const id = "q-github-actions-matrix-build";
  const title = "GitHub Actions Matrix Build Strategy";
  const email = `${user.studentId}@ds.study.iitm.ac.in`;

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> AnalyticsPro is developing a Python library that must work across Python 3.10, 3.11, 
        and 3.12 on both Ubuntu and macOS. They need a GitHub Actions workflow that tests all combinations.
      </p>
      <p>
        Create a GitHub Actions workflow with the following requirements:
      </p>
      <ol>
        <li>Use a matrix strategy to test across:
          <ul>
            <li>Python versions: <code>3.10</code>, <code>3.11</code>, <code>3.12</code></li>
            <li>Operating systems: <code>ubuntu-latest</code>, <code>macos-latest</code></li>
          </ul>
        </li>
        <li>Include a step that:
          <ul>
            <li>Prints the matrix combination being tested</li>
            <li>Creates a file named <code>test-results-{python}-{os}.txt</code></li>
            <li>Contains your email <code>${email}</code></li>
          </ul>
        </li>
        <li>Upload the test results as artifacts</li>
        <li>Include your email in one of the step names</li>
      </ol>
      <p>
        <strong>Example step name:</strong> <code>${email} - Checkout</code>
      </p>
      <label for="${id}" class="form-label">Your GitHub Repository URL:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="url"
        placeholder="https://github.com/USERNAME/REPO"
        required
      />
    </div>
  `;

  const answer = email;

  return { id, title, weight, question, answer };
}
