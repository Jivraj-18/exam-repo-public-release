import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-sentiment.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [
        html`<p>Classifying text into sentiment categories.</p>`,
      ],
    },

    {
      ...(await import("./q-structured-output.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [
        html`<p>Structured JSON outputs using schema enforcement.</p>`,
      ],
    },

    {
      ...(await import("./q-spreadsheet-cleaning.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [
        html`<p>Common spreadsheet cleaning operations.</p>`,
      ],
    },

    {
      ...(await import("./q-log-filtering.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [
        html`<p>Using shell tools like grep, awk, and wc.</p>`,
      ],
    },

    {
      ...(await import("./q-sql-analysis.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [
        html`<p>SQL aggregation, filtering, and ordering.</p>`,
      ],
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return map for grading
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
