

export default function ({ weight = 1 }) {
  return {
    id: "bayes_probability",
    question: html`
      <p>
        A disease affects 1% of a population.
        A test detects the disease with:
      </p>
      <ul>
        <li>99% sensitivity</li>
        <li>95% specificity</li>
      </ul>
      <p>
        If a person tests positive, what is the probability
        they actually have the disease?
      </p>
      <p><b>Round to 2 decimal places</b></p>
    `,
    answer: 0.17,
    weight,
  };
}
