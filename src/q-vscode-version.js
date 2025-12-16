export default function ({ user, weight = 1 }) {
  return {
    id: "vscode_version_check",

    weight,

    question: `
      Install Visual Studio Code on your system.

      In the terminal (or command prompt), run the following command:
      <pre>
      code --version
      </pre>

      Copy and paste the complete output below.
    `,

    type: "text",
  };
}
