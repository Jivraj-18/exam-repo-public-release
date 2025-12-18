export default function ({ user, weight }) {
  const treeSpec = {
    owner: "octocat",
    repo: "Hello-World",
    sha: "main",
    pathPrefix: "src/",
    extension: ".py"
  };

  return {
    id: "github-file-count",
    weight,
    question: `
      <h2>GitHub Repository File Counter</h2>
      <p><strong>Difficulty:</strong> 3 (next URL only on correct answer)</p>
      <p><strong>Personalized:</strong> Yes (based on email length).</p>
      <ol>
        <li>Use the GitHub API to fetch the repository tree:
          <code>GET https://api.github.com/repos/${treeSpec.owner}/${treeSpec.repo}/git/trees/${treeSpec.sha}?recursive=1</code>
        </li>
        <li>Count files that:
          <ul>
            <li>Have path starting with <code>${treeSpec.pathPrefix}</code></li>
            <li>Have extension <code>${treeSpec.extension}</code></li>
          </ul>
        </li>
        <li>Calculate offset: <code>(length of your email) mod 3</code></li>
        <li>Final answer = file_count + offset</li>
        <li>Submit the integer only</li>
      </ol>
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${user.email.length}</p>
      <p><strong>Note:</strong> For this test, assume the actual count from the API is 42 Python files in src/</p>
    `,
    validate: (answer) => {
      const baseCount = 42; // Simulated count from GitHub API
      const offset = user.email.length % 3;
      const expected = baseCount + offset;
      const submitted = parseInt(answer, 10);
      
      if (submitted === expected) {
        return { correct: true };
      }
      
      return {
        correct: false,
        feedback: `Expected ${expected}. Base count: ${baseCount}, Offset: ${offset}, Email length: ${user.email.length}`,
      };
    },
  };
}
