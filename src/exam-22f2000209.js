import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-llm-aiproxy-challenge.js").then((m) => m.default({ user, weight: 2 }))) },
    { ...(await import("./q-nominatim-geocoding.js").then((m) => m.default({ user, weight: 2 }))) },
    { ...(await import("./q-openmeteo-weather-api.js").then((m) => m.default({ user, weight: 2 }))) },
    { ...(await import("./q-ngrok-fastapi-tunnel.js").then((m) => m.default({ user, weight: 2 }))) },
    { ...(await import("./q-networkx-graph-analysis.js").then((m) => m.default({ user, weight: 2 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
