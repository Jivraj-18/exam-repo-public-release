export default async function ({ user, weight = 1 }) {
  return {
    id: "24f2005398-q3",
    title: "Git",
    question: `<p>Which Git command uploads commits to GitHub?</p>`,
    answer: "git push",
    weight,
  };
}
