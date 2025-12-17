export default {
  id: "q_sklearn_columntransformer_shape",
  title: "Sklearn: Feature count after preprocessing",
  description: `
Apply:
- StandardScaler on numeric columns
- OneHotEncoder on categorical column
Return total number of features
`,
  evaluate: async ({ python }) => {
    const code = `
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
  "age": [20,30,40],
  "income": [20000,30000,40000],
  "city": ["A","B","C"]
})

ct = ColumnTransformer([
  ("num", StandardScaler(), ["age","income"]),
  ("cat", OneHotEncoder(), ["city"])
])

print(ct.fit_transform(df).shape[1])
`;
    return python(code);
  },
};
