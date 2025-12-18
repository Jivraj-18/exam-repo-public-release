import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        // 1. Python List Slicing
        {
            ...(await import("./q-23f2001072-1.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        // 2. Pandas DataFrame Operations
        {
            ...(await import("./q-23f2001072-2.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        // 3. SQL Join Mechanics
        {
            ...(await import("./q-23f2001072-3.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        // 4. Statistics: Median Calculation
        {
            ...(await import("./q-23f2001072-4.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
        // 5. Machine Learning: Metrics
        {
            ...(await import("./q-23f2001072-5.js").then((m) =>
                m.default({ user, weight: 1 })
            )),
        },
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
