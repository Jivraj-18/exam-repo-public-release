import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cleaning-text.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-counting-log-entries.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-ffmpeg-audio-extraction.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-dbt-performance-strategy.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-flattening-json.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
