import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-linux-grep.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-http-status.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-branch.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-sql-count.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-python-len.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
