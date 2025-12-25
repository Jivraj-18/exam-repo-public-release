import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-seasonal-index.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-time-to-purchase.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-weekly-churn.js").then((m) => [m.default({ user })])),
    ...(await import("./q-price-elasticity.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-datasette-hotspot.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  // Render to DOM
  displayQuestions(results, elementMap);

  // Return mapping for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
