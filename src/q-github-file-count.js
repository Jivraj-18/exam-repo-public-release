export default function ({ user, weight }) {
  const files = [
    "README.md",
    "index.js",
    "package.json",
    "utils/helpers.js",
    "utils/math.js",
    "docs/intro.md",
  ];

  return {
    id: "github-file-count",
    weight,
    question: `
      <h2>GitHub Repository Analysis</h2>
      <p><strong>Difficulty:</strong> 3</p>
      <p><strong>Personalized:</strong> No</p>

      <p>Files detected in a GitHub repository:</p>

      <pre>${files.join("\n")}</pre>

      <ol>
        <li>Count only <code>.js</code> files</li>
        <li>Ignore files inside <code>docs/</code></li>
      </ol>

      <p><strong>Submit the numeric count</strong></p>
    `,
    validate: (answer) => {
      const expected = files.filter(
        f => f.endsWith(".js") && !f.startsWith("docs/")
      ).length;

      if (parseInt(answer) === expected) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: `Expected ${expected}`,
      };
    },
  };
}
