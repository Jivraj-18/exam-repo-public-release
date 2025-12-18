import q1 from "./q-23f3004174-my-bonus-question.js";
import q2 from "./q-23f3004174-api-analysis.js";
import q3 from "./q-23f3004174-pandas-rolling.js";
import q4 from "./q-23f3004174-data-join.js";
import q5 from "./q-23f3004174-visual-trend.js";

export const questions = async (user, elementMap) => {
  return Object.assign(
    {},
    await q1(user, elementMap),
    await q2(user, elementMap),
    await q3(user, elementMap),
    await q4(user, elementMap),
    await q5(user, elementMap),
  );
};
