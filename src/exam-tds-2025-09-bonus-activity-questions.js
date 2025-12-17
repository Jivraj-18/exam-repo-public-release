export async function questions(user, elementMap) {
  const results = [
    
    // GA8: Visualization - Seaborn Data Visualization
    {
      ...(await import("./q-seaborn-data-visualization.js").then((m) => m.default({ user, weight: 1.5 }))),
      help: md(visualization),
    },

    
    // GitHub Copilot - Build Calculator with AI
    {
      ...(await import("./q-copilot-build-calculator.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Markdown Documentation
    {
      ...(await import("./q-markdown-architecture.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Playwright Web Scraping
    {
      ...(await import("./q-playwright-scrape-quotes.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Google Sheets ARRAYFORMULA
    {
      ...(await import("./q-sheets-arrayformula.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // LLM Vision - Chart Analysis
    {
      ...(await import("./q-vision-chart-analysis.js").then((m) => m.default({ user, weight: 1 }))),
    },

  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
