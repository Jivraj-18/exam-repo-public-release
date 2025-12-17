import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        // Question 1: HAR Analysis (Data Parsing/Performance)
        {
            ...(await import("./q-har-performance-analysis.js").then((m) => m.default({ user, weight: 1.0 }))),
        },
        // Question 2: Git Rebase Squash (Version Control)
        {
            ...(await import("./q-git-rebase-squash.js").then((m) => m.default({ user, weight: 1.0 }))),
        },
        // Question 3: Python Decorator Bug (Advanced Python)
        {
            ...(await import("./q-python-decorator-memoize.js").then((m) => m.default({ user, weight: 1.0 }))),
        },
        // Question 4: Bash Log Stats (Shell Scripting)
        {
            ...(await import("./q-bash-log-stats.js").then((m) => m.default({ user, weight: 1.0 }))),
        },
        // Question 5: SQL Running Total (Advanced Database)
        {
            ...(await import("./q-sqlite-running-total.js").then((m) => m.default({ user, weight: 1.0 }))),
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
