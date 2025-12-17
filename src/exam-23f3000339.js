import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-d3-bubble-520.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-image-metadata-360.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-hf-space-check.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-stego-roll-512.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-org-profile.js").then((m) =>
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
