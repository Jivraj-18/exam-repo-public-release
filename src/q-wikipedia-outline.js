export default function ({ user, weight = 1 }) {
  const id = "wikipedia-outline";

  const question = `
Fetch the Wikipedia page for Japan.

How many total headings (H1–H6) are present?
`;

  const answer = async () => {
    const html = await fetch(
      "https://en.wikipedia.org/wiki/Japan"
    ).then((r) => r.text());

    const matches = html.match(/<h[1-6][^>]*>/g);
    return matches ? matches.length : 0;
  };

  return { id, question, answer, weight };
}
