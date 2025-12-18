export default async function ({ user, weight = 1 }) {
  return {
    id: "data_sourcing_to_visualization",

    title: "From Data Sourcing to Visualization",

    question: /* html */ `
      <p>
        You are building a small data science application that demonstrates the
        complete workflow from <b>data sourcing</b> to <b>data visualization</b>.
      </p>

      <p><b>Task:</b></p>
      <ol>
        <li>Source a real-world dataset using <b>one</b> of the following methods:
          <ul>
            <li>Download from a public dataset portal</li>
            <li>Query a public API</li>
            <li>Scrape data from a publicly accessible website</li>
          </ul>
        </li>
        <li>Clean and transform the dataset (handle missing values or inconsistent fields).</li>
        <li>Perform a small analysis to extract at least <b>one insight</b>.</li>
        <li>Create at least <b>one visualization</b> that communicates the insight clearly.</li>
      </ol>

      <p>
        Publish the final result as a <b>public GitHub repository</b>.
      </p>

      <p>
        The repository <b>must</b> contain:
      </p>
      <ul>
        <li>The raw data or data source description</li>
        <li>The code used for cleaning and analysis</li>
        <li>The visualization output</li>
        <li>Your email ID: <code>${user.email}</code> mentioned in the README</li>
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
