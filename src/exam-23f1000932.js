import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-git-config-email.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-linux-make-executable.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-python-venv.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-sqlite-select-limit.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-bash-grep-error.js").then(m => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}