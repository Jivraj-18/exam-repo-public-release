export default function ({ user, weight = 1 }) {
  return {
    id: "numpy_array_stats",
    weight,
    title: "NumPy Array Statistics",
    question: `
Given a NumPy array of numbers, which function is used to compute
the standard deviation of the array?
    `,
    type: "mcq",
    options: [
      "np.mean()",
      "np.std()",
      "np.var()",
      "np.sum()"
    ],
    answer: "np.std()"
  };
}
