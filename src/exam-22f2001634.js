import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-vibe_code_github_api.js")).then(m => [m.default({ user })]),
    ...(await import("./q-vibe_code_data_crunching.js")).then(m => [m.default({ user })]),
    ...(await import("./q-claude_artifacts_app.js")).then(m => [m.default({ user })]),
    ...(await import("./q-gemini_canvas_app.js")).then(m => [m.default({ user })]),
    ...(await import("./q-github_copilot_chat_app.js")).then(m => [m.default({ user })]),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
