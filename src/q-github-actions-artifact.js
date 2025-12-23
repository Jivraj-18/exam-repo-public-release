
export default async function({ user, weight = 1 }) {
    return {
        id: "github_actions_artifact",

        title: "GitHub Actions Artifact Upload Logic",

        question: `
      <p>A GitHub Actions workflow has two jobs:</p>
      <ul>
        <li><code>build</code></li>
        <li><code>test</code> (depends on build)</li>
      </ul>

      <p>
        The <code>build</code> job uploads an artifact only if the build
        succeeds. The <code>test</code> job downloads the artifact and runs
        tests.
      </p>

      <p>If the build fails, how many jobs will run successfully?</p>
    `,

        answer: 0,

        validate: (v) => {
            const n = Number(v);
            if (!Number.isInteger(n)) return "Answer must be an integer";
            if (n !== 0) return "Incorrect. Dependent jobs do not run on failure.";
            return true;
        },

        weight,
    };
}
