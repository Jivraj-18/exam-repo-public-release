import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-git-branch-naming.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-question-file-naming.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-exam-url-structure.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-exam-metadata-files.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-local-setup-command.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}