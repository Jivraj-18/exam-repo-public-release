export default async function ({ user, weight = 1 }) {
  return {
    id: "deploy_data_application",

    title: "Deploy a Data Application for Public Use",

    question: /* html */ `
      <p>
        You have built a small data application that performs analysis and
        displays results for users.
      </p>

      <p><b>Task:</b></p>
      <ol>
        <li>Create a simple data application (e.g., dashboard or report) that:
          <ul>
            <li>Loads a dataset</li>
            <li>Performs at least one data transformation</li>
            <li>Displays the result visually</li>
          </ul>
        </li>
        <li>Deploy the application using a public deployment tool
            (e.g., GitHub Pages, Render, Streamlit Cloud, or similar).</li>
      </ol>

      <p>
        The deployed application must clearly display:
      </p>
      <ul>
        <li>Your email ID: <code>${user.email}</code></li>
        <li>A short description of the dataset</li>
        <li>An explanation of the transformation performed</li>
      </ul>

      <p>
        Enter the <b>public deployment URL</b> below.
      </p>
    `,

    answer: {
      type: "url",
      validate: (value) =>
        value.startsWith("https://"),
    },

    weight,
  };
}
