export default function ({ user, weight = 1 }) {
  const id = "rest-api-pagination";

  const question = `
The Star Wars API provides a paginated list of planets at:
https://swapi.dev/api/planets/

Ignore planets with population "unknown".

What is the total population across all planets?
`;

  const answer = async () => {
    let url = "https://swapi.dev/api/planets/";
    let total = 0;

    while (url) {
      const data = await fetch(url).then((r) => r.json());
      for (const p of data.results) {
        if (p.population !== "unknown") {
          total += Number(p.population);
        }
      }
      url = data.next;
    }

    return total;
  };

  return { id, question, answer, weight };
}
