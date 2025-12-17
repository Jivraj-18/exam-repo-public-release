import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // New 5 questions (this message)
    {
      ...(await import("./q-pylatex-onepage.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-gha-wttr-yaml.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-pydantic-ai-fib-sum.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-localhost-secret-api.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-ollama-gemma-ngrok.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
