import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Learning resources
import crawlingCli from "./tds/crawling-cli.md";
import duckdbPrep from "./tds/data-preparation-in-duckdb.md";
import fastapiGuide from "./tds/fastapi.md";
import seabornViz from "./tds/data-visualization-with-seaborn.md";
import llmStory from "./tds/data-storytelling-with-llms.md";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-playwright-scrape-js.js").then((m) => m.default({ user, weight: 1 })) ),
      help: md(crawlingCli),
    },
    {
      ...(await import("./q-duckdb-json-transform.js").then((m) => m.default({ user, weight: 1 })) ),
      help: md(duckdbPrep),
    },
    {
      ...(await import("./q-fastapi-csv-upload.js").then((m) => m.default({ user, weight: 1 })) ),
      help: md(fastapiGuide),
    },
    {
      ...(await import("./q-seaborn-faceted-visualization.js").then((m) => m.default({ user, weight: 1.25 })) ),
      help: md(seabornViz),
    },
    {
      ...(await import("./q-llm-structured-product-extraction.js").then((m) => m.default({ user, weight: 1.25 })) ),
      help: md(llmStory),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
