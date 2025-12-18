import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-excel-correlation.js").then(m => [m.default({ user })])),
        ...(await import("./q-excel-forecast.js").then(m => [m.default({ user })])),
        ...(await import("./q-python-pivot.js").then(m => [m.default({ user })])),
        ...(await import("./q-sql-window.js").then(m => [m.default({ user })])),
        ...(await import("./q-geo-haversine.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}