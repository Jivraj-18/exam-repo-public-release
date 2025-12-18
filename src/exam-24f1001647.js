import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-cli-current-dir.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-cli-make-dir.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-cli-remove-file.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-status.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-clone.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  // Render questions on screen
  displayQuestions(results, elementMap);

  // Return answers for evaluation
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
