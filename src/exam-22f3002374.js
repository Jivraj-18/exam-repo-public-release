import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        {
            ...(await import("./q-palindrome-check.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-array-stats.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-transform-json-data.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-string-compression.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-fibonacci-sum.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
