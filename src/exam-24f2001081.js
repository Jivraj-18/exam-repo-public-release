import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-DBSCAN-Store-Clustering-Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-High-Value_Customer_Identification.js").then(m => [m.default({ user })])),
    ...(await import("./q-Market_Basket_Product_Affinity.js").then(m => [m.default({ user })])),
    ...(await import("./q-Moving_Average_Anomaly_Detection").then(m => [m.default({ user })])),
    ...(await import("./q-SeasonalRevenuePatternAnalysis").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}