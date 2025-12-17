import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-github-actions-parallel-duration";
  const title = "GitHub Actions Parallel Job Duration";

  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate random job durations
  const testJobMinutes = randInt(3, 8);
  const lintJobMinutes = randInt(2, 5);
  const buildJobMinutes = randInt(10, 20);
  const deployJobMinutes = randInt(5, 12);
  const securityScanMinutes = randInt(4, 9);

  // Parallel jobs: test, lint, security-scan run in parallel (max of these three)
  const parallelDuration = Math.max(testJobMinutes, lintJobMinutes, securityScanMinutes);
  
  // Sequential: After parallel jobs finish, build runs, then deploy
  const totalDuration = parallelDuration + buildJobMinutes + deployJobMinutes;

  const answer = (input) => {
    const value = parseInt(String(input).trim(), 10);
    if (isNaN(value)) throw new Error("Answer must be a valid integer");
    if (value !== totalDuration) {
      throw new Error(`Expected ${totalDuration} minutes, got ${value} minutes`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Optimizing CI/CD Pipeline Duration</h4>
      <p>
        <strong>DevSpeed Inc.</strong> is optimizing their GitHub Actions CI/CD pipeline to reduce deployment time.
        Their current workflow includes multiple jobs with dependencies. Understanding parallel vs sequential execution
        is critical for minimizing overall pipeline duration.
      </p>

      <h5>Current Workflow Structure</h5>
      <p>The team has the following <code>.github/workflows/deploy.yml</code> configuration:</p>
      <pre><code class="language-yaml">name: Deploy Pipeline

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test
    # Duration: ${testJobMinutes} minutes

  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Run linter
        run: npm run lint
    # Duration: ${lintJobMinutes} minutes

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Security audit
        run: npm audit
    # Duration: ${securityScanMinutes} minutes

  build:
    runs-on: ubuntu-latest
    needs: [test, lint, security-scan]
    steps:
      - name: Build application
        run: npm run build
    # Duration: ${buildJobMinutes} minutes

  deploy:
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - name: Deploy to production
        run: ./deploy.sh
    # Duration: ${deployJobMinutes} minutes
</code></pre>

      <h5>Job Dependencies</h5>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Job</th>
            <th>Duration</th>
            <th>Depends On</th>
            <th>Execution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>test</code></td>
            <td>${testJobMinutes} minutes</td>
            <td>None</td>
            <td>Parallel with lint & security-scan</td>
          </tr>
          <tr>
            <td><code>lint</code></td>
            <td>${lintJobMinutes} minutes</td>
            <td>None</td>
            <td>Parallel with test & security-scan</td>
          </tr>
          <tr>
            <td><code>security-scan</code></td>
            <td>${securityScanMinutes} minutes</td>
            <td>None</td>
            <td>Parallel with test & lint</td>
          </tr>
          <tr>
            <td><code>build</code></td>
            <td>${buildJobMinutes} minutes</td>
            <td>test, lint, security-scan</td>
            <td>Sequential (waits for all three)</td>
          </tr>
          <tr>
            <td><code>deploy</code></td>
            <td>${deployJobMinutes} minutes</td>
            <td>build</td>
            <td>Sequential (waits for build)</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Question:</strong> What is the total duration (in minutes) of this GitHub Actions workflow from start
        to finish?
      </p>
      <p class="text-muted">
        <strong>Hint:</strong> Jobs without dependencies run in parallel. Jobs with <code>needs:</code> wait for all
        dependencies to complete before starting.
      </p>

      <label for="${id}" class="form-label">Total workflow duration (in minutes):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: calculate_workflow_duration.py

# /// script
# requires-python = ">=3.12"
# ///

def calculate_github_actions_duration(
    test_minutes: int,
    lint_minutes: int,
    security_scan_minutes: int,
    build_minutes: int,
    deploy_minutes: int
) -> int:
    """
    Calculate total GitHub Actions workflow duration.
    
    Parallel jobs (no dependencies): test, lint, security-scan
    Sequential jobs: build (after parallel), deploy (after build)
    
    Total = max(parallel jobs) + build + deploy
    """
    # Parallel jobs take as long as the longest one
    parallel_duration = max(test_minutes, lint_minutes, security_scan_minutes)
    
    # Sequential execution after parallel jobs
    total = parallel_duration + build_minutes + deploy_minutes
    
    return total


if __name__ == "__main__":
    test = 5
    lint = 3
    security = 6
    build = 15
    deploy = 8
    
    duration = calculate_github_actions_duration(test, lint, security, build, deploy)
    
    print(f"Parallel jobs duration: {max(test, lint, security)} minutes")
    print(f"Build duration: {build} minutes")
    print(f"Deploy duration: {deploy} minutes")
    print(f"Total workflow duration: {duration} minutes")
*/