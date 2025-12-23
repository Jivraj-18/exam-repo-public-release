export default async function question({ user, weight = 1 }) {
  return {
    id: "pandas_vectorization",
    weight,
    question: "Which method is the most time-efficient for performing element-wise operations on a large Pandas DataFrame?",
    options: [
      "Standard Python for-loop",
      "df.iterrows()",
      "df.apply()",
      "Vectorized operations (NumPy/Pandas built-ins)"
    ],
    answer: "Vectorized operations (NumPy/Pandas built-ins)"
  };
}
