import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-shell-log-window.js").then(m => [m.default({ user })])),
        ...(await import("./q-json-unit-normalization.js").then(m => [m.default({ user })])),
        ...(await import("./q-duckdb-weighted-cost.js").then(m => [m.default({ user })])),
        ...(await import("./q-github-cron.js").then(m => [m.default({ user })])),
        ...(await import("./q-data-imputation.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}