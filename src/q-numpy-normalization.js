export default function ({ user, weight = 1 }) {
  return {
    id: "q_numpy_normalization",
    title: "NumPy: Min–Max normalization",
    description: `
Given a NumPy array of values,
apply Min–Max normalization and
return the normalized array.
`,
    weight,
    evaluate: async ({ python }) => {
      const code = `
import numpy as np

arr = np.array([10, 20, 30, 40, 50])
norm = (arr - arr.min()) / (arr.max() - arr.min())
print(norm)
`;
      return python(code);
    },
  };
}