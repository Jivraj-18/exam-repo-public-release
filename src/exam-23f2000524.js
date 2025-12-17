import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-undo-commit.js").then(m => [m.default({ user })])),
    ...(await import("./q-image-colorspace-repack.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-revenue-retention.js").then(m => [m.default({ user })])),
    ...(await import("./q-sample-size-effect.js").then(m => [m.default({ user })])),
    ...(await import("./q-sort-filter-shipments.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
