export default async function q1({ weight = 1 }) {
  return {
    id: 'q1-git-hook',
    title: 'Git Branch Naming Hook',
    type: 'text',
    description: `<p>Create a bash script <code>pre-commit-branch-check.sh</code> that checks the current Git branch name.</p>
<ul>
  <li>Use <code>git branch --show-current</code> to get the branch name.</li>
  <li>Accept only names matching <code>^feature/[a-z0-9-]+$</code> or <code>^bugfix/[a-z0-9-]+$</code>.</li>
  <li>Print an error and exit with status <code>1</code> for any other name.</li>
  <li>Exit with status <code>0</code> when the name is valid.</li>
</ul>
<p><strong>Expected file:</strong> <code>pre-commit-branch-check.sh</code></p>`,
    weight,
  };
}
