import { displayQuestions } from "./utils/display.js";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export async function questions(user, elementMap) {
  const results = [
    // Question 1: CSV Column Validation
    {
      ...(await import("./q-csv-column-validate.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [html``, html``],
    },
    // Question 2: Extract Unique Nested Values from JSON
    {
      ...(await import("./q-json-unique-values.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [html``, html``],
    },
    // Question 3: Weighted Moving Average
    {
      ...(await import("./q-time-series-average.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [html``, html``],
    },
    // Question 4: Filter and Aggregate JSON Data
    {
      ...(await import("./q-json-filter-aggregate.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [html``, html``],
    },
    // Question 5: Flatten Nested Customer Orders
    {
      ...(await import("./q-json-flatten-orders.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [html``, html``],
    },
    
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}