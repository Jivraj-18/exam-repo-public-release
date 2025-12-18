import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        {
            ...(await import("./q-sample.js").then((m) =>
                m.default({
                    user,
                    weight: 1,
                }),
            )),
            help: [],
        },
        {
            ...(await import("./q-log-analysis.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-csv-sum.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-git-hash.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-llm-price.js").then((m) => m.default({ user, weight: 1 }))),
        },
        {
            ...(await import("./q-python-set.js").then((m) => m.default({ user, weight: 1 }))),
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
