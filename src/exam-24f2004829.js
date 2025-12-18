import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-24f2004829-1.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-24f2004829-2.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-24f2004829-3.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-24f2004829-4.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-24f2004829-5.js").then((m) => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
