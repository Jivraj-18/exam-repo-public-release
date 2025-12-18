import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-linux-file.js").then(m => [m.default({ user })])),
    ...(await import("./q-uv-python-exec.js").then(m => [m.default({ user })])),
    ...(await import("./q-netowrkx.js").then(m => [m.default({ user })])),
    ...(await import("./q-ngrok.js").then(m => [m.default({ user })])),
    ...(await import("./q-pytest.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}