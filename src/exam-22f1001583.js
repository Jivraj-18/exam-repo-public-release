import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-jsonl-telemetry-normalization.js").then((m) => [
            m.default({ user, weight: 1 }),
        ])),
        ...(await import("./q-fastapi-request-validation.js").then((m) => [
            m.default({ user, weight: 1 }),
        ])),
        ...(await import("./q-github-actions-artifact.js").then((m) => [
            m.default({ user, weight: 1 }),
        ])),
        ...(await import("./q-llm-tool-call-validity.js").then((m) => [
            m.default({ user, weight: 1 }),
        ])),
        ...(await import("./q-browser-devtools-runtime.js").then((m) => [
            m.default({ user, weight: 1 }),
        ])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
