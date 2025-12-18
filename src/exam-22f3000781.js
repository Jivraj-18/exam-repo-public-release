import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
      ...(await import("./q-OpenStreetMap Area Lookup.js").then(m =>[m.default({ user})]))
      ...(await import("./q-Hacker News Keyword Search.js").then(m =>[m.default({ user})]))
      ...(await import("./q-Wikipedia Infobox Scraping.js").then(m =>[m.default({ user})]))
      ...(await import("./q-GitHub Repository Age.js").then(m =>[m.default({ user})]))
      ...(await import("./q-HTML → Markdown (CLI).js").then(m =>[m.default({ user})]))    
    ];

  
  displayQuestions(results, elementMap);

  // 3. Return question data for scoring
  // Converts [{id: 'q1', answer, weight}, ...] to {q1: {answer, weight}, ...}
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

