export default function ({ user, weight = 1 }) {
  const id = "pdf-table";

  const question = `
From the dataset:
https://sanand0.github.io/tdsdata/pdfs/student_scores.json

Filter students with:
- Biology ≥ 60
- Group between 20 and 40 (inclusive)

What is the average Physics score (rounded to 2 decimals)?
`;

  const answer = async () => {
    const rows = await fetch(
      "https://sanand0.github.io/tdsdata/pdfs/student_scores.json"
    ).then((r) => r.json());

    const filtered = rows.filter(
      (r) => r.Biology >= 60 && r.Group >= 20 && r.Group <= 40
    );

    const avg =
      filtered.reduce((s, r) => s + r.Physics, 0) /
      filtered.length;

    return Number(avg.toFixed(2));
  };

  return { id, question, answer, weight };
}
