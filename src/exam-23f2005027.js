import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-secure-cli.js").then(m => [m.default({ user })])),
    ...(await import("./q-AI+UNIX-pipeline.js").then(m => [m.default({ user })])),
    ...(await import("./q-cursor-AI-editor-workflow.js").then(m => [m.default({ user })])),
    ...(await import("./q-context-engineering-files.js").then(m => [m.default({ user })])),
    ...(await import("./q-cl+ai-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}