export default async function ({ user, weight = 1 }) {
  return {
    id: "data_visualization_narrative",

    title: "Create a Data Story Using Visualizations",

    question: /* html */ `
      <p>
        You are asked to communicate insights from a dataset to a
        <b>non-technical audience</b>.
      </p>

      <p><b>Task:</b></p>
      <ol>
        <li>Select a real-world public dataset.</li>
        <li>Create at least <b>two visualizations</b> that highlight
            different aspects of the data.</li>
        <li>Write a short narrative explaining:
          <ul>
            <li>What each visualization shows</li>
            <li>Why the insight is important</li>
          </ul>
        </li>
      </ol>

      <p>
        Present the data story as a web page, notebook, or slide-based
        presentation published online.
      </p>

      <p>
        The final output must clearly display your email ID:
        <code>${user.email}</code>
      </p>

      <p>
        Enter the <b>public URL</b> of your data story below.
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
