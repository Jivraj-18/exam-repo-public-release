import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli+git.js").then(m => [m.default({ user })])),
    ...(await import("./q-AICodingCLI.js").then(m => [m.default({ user })])),
    ...(await import("./q-Pythontesting.js").then(m => [m.default({ user })])),
    ...(await import("./q-FastAPI.js").then(m => [m.default({ user })])),
    ...(await import("./q-Github-Actions.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}