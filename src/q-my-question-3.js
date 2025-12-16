export default function ({ weight = 1 }) {
  return {
    id: "q3-git-rewrite",
    weight,
    question: `
Which Git operation rewrites commit history?
    `,
    answer: "Rebase",
  };
}
