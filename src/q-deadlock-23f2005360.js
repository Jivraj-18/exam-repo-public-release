

export default function ({ weight = 1 }) {
  return {
    id: "deadlock_conditions",
    question: html`
      <p>
        Which of the following conditions is
        <b>NOT</b> necessary for deadlock to occur?
      </p>
      <p>
        Answer with the exact term:
      </p>
      <ul>
        <li>Mutual Exclusion</li>
        <li>Hold and Wait</li>
        <li>No Preemption</li>
        <li>Starvation</li>
      </ul>
    `,
    answer: "Starvation",
    weight,
  };
}
