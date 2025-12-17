export default async function q5({ weight = 1 }) {
  return {
    id: 'q5-actions-matrix',
    title: 'GitHub Actions Matrix for Python Tests',
    type: 'text',
    description: `<p>Create a GitHub Actions workflow file <code>.github/workflows/test.yml</code> that:</p>
<ol>
  <li>Runs on <code>push</code> and <code>pull_request</code> events to the <code>main</code> branch.</li>
  <li>Uses a matrix to test Python versions 3.9, 3.10, and 3.11.</li>
  <li>For each version, the job must:</li>
  <ul>
    <li>Check out the repository code.</li>
    <li>Set up the requested Python version.</li>
    <li>Install dependencies with <code>pip install -r requirements.txt</code>.</li>
    <li>Run tests with <code>python -m pytest</code>.</li>
  </ul>
</ol>
<p><strong>Expected file:</strong> <code>.github/workflows/test.yml</code></p>`,
    weight,
  };
}
