export default function ({ user, weight = 1 }) {
  return {
    id: "wiki_population",
    title: "Wikipedia Population Scraper",
    weight,
    description: `
Fetch the Wikipedia page for **Japan** and extract the **population value**
from the infobox table.

Return only the population number as a string (no commas).
    `,
    inputType: "text",
    expectedAnswerType: "string",
    checker: async (answer) => /^\d+$/.test(answer.trim()),
  };
}
