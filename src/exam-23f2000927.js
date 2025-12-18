import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-llm-sentiment-httpx.js").then(m => [m.default({ user })])),
        ...(await import("./q-token-count-mini.js").then(m => [m.default({ user })])),
        ...(await import("./q-structured-address-json.js").then(m => [m.default({ user })])),
        ...(await import("./q-vision-base64-json.js").then(m => [m.default({ user })])),
        ...(await import("./q-embeddings-json-body.js").then(m => [m.default({ user })])),
        ...(await import("./q-embedding-most-similar.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}
