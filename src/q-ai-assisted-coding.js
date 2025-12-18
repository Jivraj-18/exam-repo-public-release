export default async function ({ user, weight = 1 }) {
  return {
    id: "ai_coding_for_data_tools",

    title: "Using AI Coding Tools in Data Applications",

    question: /* html */ `
      <p>
        You are developing a data processing script and use an
        <b>AI coding assistant</b> to generate Python code.
      </p>

      <p><b>Task:</b></p>
      <ol>
        <li>Use an AI coding tool to generate a Python script that:
          <ul>
            <li>Loads a dataset</li>
            <li>Performs at least one data cleaning operation</li>
            <li>Creates a simple visualization</li>
          </ul>
        </li>
        <li>Manually review the generated code and identify
            <b>one issue</b> related to correctness, performance, or data handling.</li>
        <li>Fix the issue and clearly document:
          <ul>
            <li>What the AI-generated code did incorrectly</li>
            <li>How you corrected it</li>
          </ul>
        </li>
      </ol>

      <p>
        Publish the final code and explanation in a
        <b>public GitHub repository</b>.
      </p>

      <p>
        Your email ID <code>${user.email}</code> must appear in the README.
      </p>

      <p>
        Enter the <b>GitHub commit URL</b> that contains your corrected code.
      </p>
    `,

    answer: {
      type: "url",
      validate: (value) =>
        value.startsWith("https://github.com/") &&
        value.includes("/commit/"),
    },

    weight,
  };
}
