import { displayQuestions } from "./utils/display.js";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export async function questions(user, elementMap) {
    const results = [
        {
            ...(await import("./q-python-list-comp.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-sql-groupby-count.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-regex-email.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-js-array-sum.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        {
            ...(await import("./q-bash-line-count.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
