import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-chat-completion.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-llm-embedding-request.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-llm-function-calling.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-llm-image-generation.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-llm-text-to-speech.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}