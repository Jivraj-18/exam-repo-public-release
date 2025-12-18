export default function ({ weight = 1 }) {
  return {
    id: "bash-csv-average",

    question: `
      You are given a CSV file named <code>data.csv</code>
      with the following contents:

      <pre>
city,temperature
Agra,30
Delhi,28
Mumbai,32
Indore,26
Pune,24
      </pre>

      <br>
      Using <strong>only Bash commands</strong> (such as
      <code>grep</code> and <code>awk</code>), calculate the
      <strong>average temperature</strong> of cities whose
      names start with a <strong>vowel</strong>
      (<code>A, E, I, O, U</code>).

      <br><br>
      <strong>Answer format:</strong><br>
      A single floating-point number rounded to
      <strong>2 decimal places</strong>.
    `,

    answer: "28.00",

    weight,
  };
}
