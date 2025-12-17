export default async function ({ user, weight = 1 }) {
  return {
    id: "text-cleaning-python",
    weight,
    title: "Text Cleaning in Python",
    question: `
Which Python module is commonly used to remove punctuation
and clean text?
    `,
    options: [
      "numpy",
      "pandas",
      "re",
      "flask",
    ],
    answer: 2,
  };
}
