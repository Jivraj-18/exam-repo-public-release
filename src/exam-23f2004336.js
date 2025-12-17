import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    (await import("./q-api-response-validation.js")).default({ user }),
    (await import("./q-csv-to-json.js")).default({ user }),
    (await import("./q-git-branch-safety.js")).default({ user }),
    (await import("./q-docker-optimization.js")).default({ user }),
    (await import("./q-pandas-filter-count.js")).default({ user })
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
