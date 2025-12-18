import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = await Promise.all([
        import("./q-Advanced-GitHub-Actions-Scheduling.js").then(m => m.default({ user })),
        import("./q-Advanced-Google-Sheets-IMPORTHTML.js").then(m => m.default({ user })),
        import("./q-Advanced-LLM-Structured-Outputs.js").then(m => m.default({ user })),
        import("./q-Advanced-Vibe-Coding-GitHub-API.js").then(m => m.default({ user })),
        import("./q-Basic-Git-Command.js").then(m => m.default({ user })),
      ]);
      

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}