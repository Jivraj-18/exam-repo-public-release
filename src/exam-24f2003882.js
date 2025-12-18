import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        { ...(await import("./q-linux-grep-logs.js").then((m) => m.default({ user, weight: 1 }))) },
        { ...(await import("./q-git-coin-log.js").then((m) => m.default({ user, weight: 1 }))) },
        { ...(await import("./q-python-transformation.js").then((m) => m.default({ user, weight: 1 }))) },
        { ...(await import("./q-sql-invoice-sum.js").then((m) => m.default({ user, weight: 1 }))) },
        { ...(await import("./q-excel-text-processing.js").then((m) => m.default({ user, weight: 1 }))) },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
