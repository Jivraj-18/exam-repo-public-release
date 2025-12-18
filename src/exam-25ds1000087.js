import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-last-commits.js").then(m => [m.default({ user })])),
    ...(await import("./q-ipify-json.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-csv-summary.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-task-route.js").then(m => [m.default({ user })])),
    ...(await import("./q-copilot-cli-start.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}