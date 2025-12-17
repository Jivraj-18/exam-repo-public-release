import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        {
            ...(await import("./q-python-list-comprehension.js").then((m) => m.default)),
            weight: 1,
        },
        {
            ...(await import("./q-sql-join.js").then((m) => m.default)),
            weight: 1,
        },
        {
            ...(await import("./q-excel-vlookup.js").then((m) => m.default)),
            weight: 1,
        },
        {
            ...(await import("./q-json-parse.js").then((m) => m.default)),
            weight: 1,
        },
        {
            ...(await import("./q-matplotlib-scatter.js").then((m) => m.default)),
            weight: 1,
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
