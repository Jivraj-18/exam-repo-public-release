import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-vscode-version.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-node-npm-version.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-config.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-google-sheets-filter.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-commit-count.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
