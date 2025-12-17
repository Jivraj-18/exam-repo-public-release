export default function ({ user, weight = 1 }) {
  const id = "js-rendered-table";

  const seed =
    Number(user.email.match(/\d+/)?.[0] ?? 42) % 10;

  const question = `
Visit:
https://sanand0.github.io/tdsdata/js_tables/${seed}.html

What is the sum of all numbers in all tables on the page?
`;

  const answer = async () => {
    const data = await fetch(
      `https://sanand0.github.io/tdsdata/js_tables/${seed}.json`
    ).then((r) => r.json());

    return data.flat().reduce((a, b) => a + b, 0);
  };

  return { id, question, answer, weight };
}
