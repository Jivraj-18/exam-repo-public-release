export default function ({ user, weight = 1 }) {
  return {
    id: "git_config_check",

    weight,

    question: `
      Install Git on your system.

      In the terminal, run the following command:
      <pre>
      git config --list
      </pre>

      Copy and paste the first 10 lines of the output below.
    `,

    type: "text",
  };
}
