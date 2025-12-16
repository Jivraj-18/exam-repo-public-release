export default function ({ user, weight = 1 } = {}) {
  return {
    id: "q-imputation-missing-data",
    title: "Missing Data Imputation Strategy",
    weight,
    prompt: /* html */ `
      <p>
        You are given a CSV dataset with the following columns:
        <code>customer_id, age, gender, income, num_transactions</code>.
        Approximately 20% of the <code>income</code> values and 10% of the
        <code>age</code> values are missing.
      </p>

      <p>
        <b>Tasks:</b>
        <ol>
          <li>Propose a suitable imputation strategy for <code>age</code> and <code>income</code>.</li>
          <li>Justify why your chosen methods are appropriate.</li>
          <li>Write pseudocode or Python code to perform the imputation.</li>
          <li>Explain how you would verify that imputation did not distort the data.</li>
        </ol>
      </p>
    `
  };
}
