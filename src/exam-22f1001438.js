export async function questions(user) {
  return [
    await import("./q-api-data-fetching.js").then(m => m.default({ user, weight: 1 })),
    await import("./q-correlation-analysis.js").then(m => m.default({ user, weight: 1 })),
    await import("./q-data-cleaning-outliers.js").then(m => m.default({ user, weight: 1 })),
    await import("./q-llm-prompt-engineering.js").then(m => m.default({ user, weight: 1 })),
    await import("./q-regex-identifier.js").then(m => m.default({ user, weight: 1 })),
  ];
}