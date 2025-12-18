export default function ({ user, weight }) {
  const port = 8080;

  return {
    id: "dockerfile-healthcheck",
    weight,

    question: `
Write a **minimal Dockerfile snippet** (3–8 lines) for a Node.js app that:

• Uses \`node:18-alpine\`
• Sets working directory to \`/app\`
• Copies \`package.json\`
• Runs \`npm ci\`
• Exposes port **${port}**
• Starts the app with \`npm start\`

Paste only the Dockerfile content.
`,

    validate: (answer) => {
      if (!answer) return "Dockerfile snippet required";

      const text = answer.toLowerCase();
      const checks = [
        /from\s+node:18-alpine/,
        /workdir\s+\/app/,
        /copy\s+package\.json/,
        /npm\s+ci/,
        /expose\s+8080/,
        /npm\s+start/,
      ];

      const failed = checks.filter((r) => !r.test(text));
      return failed.length === 0
        ? true
        : "Dockerfile is missing one or more required instructions.";
    },
  };
}
