export default function ({ user, weight = 1 }) {
  return {
    id: "q_sklearn_train_test_shape",
    title: "Sklearn: Train-test split shape",
    description: `
Split a dataset into 70% train and 30% test.
Return the number of samples in the training set.
`,
    weight,
    evaluate: async ({ python }) => {
      const code = `
from sklearn.model_selection import train_test_split
import pandas as pd

df = pd.DataFrame({"x": range(100), "y": range(100)})
X_train, X_test = train_test_split(df, test_size=0.3, random_state=42)
print(len(X_train))
`;
      return python(code);
    },
  };
}