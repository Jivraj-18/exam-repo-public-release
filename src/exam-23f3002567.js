import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        {
            ...(await import("./q-bash-pipeline.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-sql-count.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-pandas-mean.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-regex-count.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-git-checkout.js").then((m) => m.default({ user, weight: 1 }))),
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
