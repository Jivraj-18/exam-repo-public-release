import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-status-command.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-virtual-environment.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-image-listing.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-table-creation.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-file-deletion.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}