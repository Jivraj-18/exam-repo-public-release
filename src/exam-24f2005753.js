import q1 from "./q-24f2005753-web-scrape-structure.js";
import q2 from "./q-24f2005753-api-insight.js";
import q3 from "./q-24f2005753-github-action-data.js";
import q4 from "./q-24f2005753-fastapi-deploy.js";
import q5 from "./q-24f2005753-llm-storytelling.js";

export const questions = async (user, elementMap) => {
  return Object.assign(
    {},
    await q1(user, elementMap),
    await q2(user, elementMap),
    await q3(user, elementMap),
    await q4(user, elementMap),
    await q5(user, elementMap)
  );
};
