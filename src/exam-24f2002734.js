import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-dockerfile-port.js").then(m => [m.default({ user })])),
        ...(await import("./q-github-actions.js").then(m => [m.default({ user })])),
        ...(await import("./q-huggingface-space.js").then(m => [m.default({ user })])),
        ...(await import("./q-codespaces.js").then(m => [m.default({ user })])),
        ...(await import("./q-ollama.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}