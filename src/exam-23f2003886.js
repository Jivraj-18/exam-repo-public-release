import { displayQuestions } from "./utils/display.js";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-timeseries-server-load.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Group by the hour of the timestamp to find the peak average.</p>`],
    },
    {
      ...(await import("./q-geo-delivery-zones.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Use the Haversine formula for accurate distance calculation.</p>`],
    },
    {
      ...(await import("./q-algo-fizzbuzz-sum.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>This is an XOR logic puzzle: (A or B) but not (A and B).</p>`],
    },
    {
      ...(await import("./q-excel-pivot-category.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>A Pivot Table is the fastest way to solve this.</p>`],
    },
    {
      ...(await import("./q-biz-tiered-pricing.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Calculate costs sequentially through the usage tiers.</p>`],
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}