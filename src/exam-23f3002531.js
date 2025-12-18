import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-googlesheet-import.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-schedule.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-user-agent.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-to-markdown-tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-capabilities.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}