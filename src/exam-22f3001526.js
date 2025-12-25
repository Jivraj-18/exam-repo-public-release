import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    
    ...(await import("./q-Web-inference-standard.js").then(m => [m.default({ user })])),
    ...(await import("./q-Cursor-features.js").then(m => [m.default({ user })])),
    ...(await import("./q-Windsurf-agent.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python-mutation-testing.js").then(m => [m.default({ user })])),
    ...(await import("./q-Simon-Willison's-llm-CLI.js").then(m => [m.default({ user })])),
    ...(await import("./q-Context-engineering-tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-Claude-code-memory.js").then(m => [m.default({ user })])),
    
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}