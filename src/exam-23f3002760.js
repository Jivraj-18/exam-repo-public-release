import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Git-Basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-Bash-Pipeline.js").then(m => [m.default({ user })])),
    ...(await import("./q-AI-CLI-Tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python-Execution.js").then(m => [m.default({ user })])),
    ...(await import("./q-FastAPI-Basics.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
