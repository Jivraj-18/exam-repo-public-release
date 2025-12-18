import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-image-steg.js").then(m => m.default({ user })),
    await import("./q-fastapi-cache.js").then(m => m.default({ user })),
    await import("./q-embedding-search.js").then(m => m.default({ user })),
    await import("./q-mst-network.js").then(m => m.default({ user })),
    await import("./q-csv-zip.js").then(m => m.default({ user })),
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
