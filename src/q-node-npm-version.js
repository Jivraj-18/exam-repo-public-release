export default function ({ user, weight = 1 }) {
  return {
    id: "node_npm_version_check",

    weight,

    question: `
      Install Node.js on your system.

      In the terminal, run the following commands:
      <pre>
      node -v
      npm -v
      </pre>

      Copy and paste the complete output below.
    `,

    type: "text",
  };
}
