export async function questions(user, elementMap) {
  // Load displayQuestions in a way that works whether it's default-exported or named-exported
  const displayMod = await import("./utils/display.js");
  const displayQuestions =
    displayMod.displayQuestions ?? displayMod.default;

  if (typeof displayQuestions !== "function") {
    throw new TypeError(
      "displayQuestions export not found in ./utils/display.js (expected default export or named export 'displayQuestions')"
    );
  }

  // Import all question modules
  const modules = await Promise.all([
    import("./q-aipipe-flex-flag.js"),
    import("./q-aipipe-openai-embeddings.js"),
    import("./q-cosine-normalized-dot.js"),
    import("./q-jina-embeddings-endpoint.js"),
    import("./q-openai-toolchoice-required.js"),
  ]);

  // IMPORTANT: await each question generator (they are async)
  const results = await Promise.all(modules.map((m) => m.default({ user })));

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

// Some runners call default; some call named. Export both.
export default questions;
