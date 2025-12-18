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

  // Validation function to check if the GitHub repository contains the required workflow
  const validate = async (submittedUrl) => {
    try {
      // Parse GitHub URL to extract owner and repo
      const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = submittedUrl.match(urlPattern);
      
      if (!match) {
        return { valid: false, message: "Invalid GitHub repository URL format" };
      }
      
      const [, owner, repo] = match;
      const repoName = repo.replace(/\.git$/, ''); // Remove .git if present
      
      // Try to fetch workflow files from .github/workflows directory
      const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/.github/workflows`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        return { valid: false, message: "Unable to access repository workflows. Ensure the repository is public." };
      }
      
      const files = await response.json();
      
      // Check each workflow file for required content
      for (const file of files) {
        if (file.name.endsWith('.yml') || file.name.endsWith('.yaml')) {
          const workflowResponse = await fetch(file.download_url);
          const workflowContent = await workflowResponse.text();
          
          // Check for required elements
          const hasMatrix = workflowContent.includes('matrix:');
          const hasPython310 = /\b["']?3\.10["']?\b/.test(workflowContent);
          const hasPython311 = /\b["']?3\.11["']?\b/.test(workflowContent);
          const hasPython312 = /\b["']?3\.12["']?\b/.test(workflowContent);
          const hasUbuntu = workflowContent.includes('ubuntu-latest');
          const hasMacOS = workflowContent.includes('macos-latest');
          const hasEmail = workflowContent.includes(email);
          const hasArtifacts = workflowContent.includes('upload-artifact') || workflowContent.includes('actions/upload-artifact');
          
          if (hasMatrix && hasPython310 && hasPython311 && hasPython312 && hasUbuntu && hasMacOS && hasEmail && hasArtifacts) {
            return { valid: true, message: "GitHub Actions workflow verified successfully" };
          }
        }
      }
      
      return { valid: false, message: `Workflow found but missing required elements (matrix with Python 3.10/3.11/3.12, ubuntu-latest/macos-latest, email ${email}, and artifact upload)` };
    } catch (error) {
      return { valid: false, message: "Failed to validate repository. Please check the URL and ensure the repository is public." };
    }
  };

  const answer = validate;

  return { id, title, weight, question, answer, validate };
}
