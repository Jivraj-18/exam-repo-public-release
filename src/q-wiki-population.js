export default function ({ user, weight = 0.5 }) {
  return {
    id: "wiki_population_top5",
    title: "Wikipedia Population Table",
    description: `
Scrape the Wikipedia table for Indian states by population.
Add the population of the top 5 states shown in the table.
`,
    answer:  // expected numeric answer
    weight,
  };
}
