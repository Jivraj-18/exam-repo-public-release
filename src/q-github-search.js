export default function ({ user, weight = 1 }) {
  const id = "github-search";

  const question = `
Using GitHub Search API:

How many repositories have:
- language: JavaScript
- stars > 50000 ?
`;

  const answer = async () => {
    const url =
      "https://api.github.com/search/repositories?q=language:javascript+stars:>50000&per_page=1";

    const data = await fetch(url).then((r) => r.json());
    return data.total_count;
  };

  return { id, question, answer, weight };
}
