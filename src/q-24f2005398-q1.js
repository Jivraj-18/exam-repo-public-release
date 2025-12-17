export default async function ({ user, weight = 1 }) {
  return {
    id: "24f2005398-q1",
    title: "JavaScript Basics",
    question: `<p>What is the output of <code>typeof null</code>?</p>`,
    answer: "object",
    weight,
  };
}
