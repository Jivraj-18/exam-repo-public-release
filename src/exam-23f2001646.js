import { displayQuestions } from "./utils/display.js";
import { html } from "htm/preact";

export async function questions(user, elementMap) {
  const list = [
    ["./q-excel-discount-leakage.js", { weight: 1 }],
    ["./q-editor-status-transition.js", { weight: 0.5 }],
    ["./q-shell-slow-request-rate.js", { weight: 1 }],
    ["./q-json-role-coverage.js", { weight: 1 }],
    ["./q-duckdb-leadtime-risk.js", { weight: 1 }],
  ];

  const results = [];
  for (const [path, opts] of list) {
    const mod = await import(path);
    results.push({ ...(await mod.default({ user, weight: opts.weight })) });
  }

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
