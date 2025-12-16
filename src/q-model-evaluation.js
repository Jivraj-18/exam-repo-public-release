export default function ({ user, weight = 1 } = {}) {
  return {
    id: "q-model-evaluation-imbalance",
    title: "Model Evaluation for Imbalanced Classification",
    weight,
    prompt: /* html */ `
      <p>
        You are building a fraud detection model where only 1% of transactions
        are fraudulent.
      </p>

      <p>
        <b>Tasks:</b>
        <ol>
          <li>Select appropriate evaluation metrics and justify your choice.</li>
          <li>Describe a suitable cross-validation strategy.</li>
          <li>Explain how you would choose a classification threshold for deployment.</li>
        </ol>
      </p>
    `
  };
}
