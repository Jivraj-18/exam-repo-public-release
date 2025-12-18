import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-javascript-array-manipulation.js").then(m => m.default({ user })),
    await import("./q-deploy-static-html-netlify.js").then(m => m.default({ user })),
    await import("./q-environment-variables-railway.js").then(m => m.default({ user })),
    await import("./q-github-actions-matrix-build.js").then(m => m.default({ user })),
    await import("./q-llms-txt-portfolio-api.js").then(m => m.default({ user })),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
