export default async function ({ user, weight = 1 }) {
  return {
    id: "data_analysis_method",

    title: "Apply an Appropriate Data Analysis Technique",

    question: /* html */ `
      <p>
        You are given a real-world dataset where relationships between entities
        or locations are important.
      </p>

      <p><b>Task:</b></p>
      <ol>
        <li>Choose a dataset suitable for <b>one</b> of the following:
          <ul>
            <li>Statistical analysis</li>
            <li>Geospatial analysis</li>
            <li>Network analysis</li>
          </ul>
        </li>
        <li>Apply at least one analysis technique relevant to your chosen method.</li>
        <li>Explain the insight obtained from the analysis.</li>
      </ol>

      <p>
        Document your work in a public GitHub repository.
      </p>

      <p>
        The repository must include:
      </p>
      <ul>
        <li>The dataset or its source</li>
        <li>The analysis code</li>
        <li>A short explanation of the insight</li>
        <li>Your email ID: <code>${user.email}</code></li>
      </ul>

      <p>
        Enter the <b>GitHub repository URL</b> below.
      </p>
    `,

    answer: {
      type: "url",
      validate: (value) =>
        value.startsWith("https://github.com/"),
    },

    weight,
  };
}
