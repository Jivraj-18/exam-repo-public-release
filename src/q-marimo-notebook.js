export default async function ({ user, weight = 1 }) {
  const id = "q-marimo-notebook-" + user;
  const title = "Reactive Data Analysis with Marimo";

  const question = html`
    <h3>Reactive Data Analysis with Marimo</h3>
    <p>
      Marimo is a reactive notebook system where cells automatically re-run when
      their dependencies change.
    </p>

    <p>
      You are asked to design an <strong>interactive Marimo notebook</strong> that
      explores the relationship between two numeric variables.
    </p>

    <ul>
      <li>Include your email <code>23f2003906@ds.study.iitm.ac.in</code> as a comment</li>
      <li>Use at least <strong>two dependent cells</strong></li>
      <li>Add an <strong>interactive widget</strong> (slider or dropdown)</li>
      <li>Show <strong>dynamic Markdown</strong> that updates when the widget changes</li>
      <li>Clearly document how data flows between cells</li>
    </ul>

    <p>
      Describe the structure of the notebook and explain how reactivity works
      between the cells. You do <strong>not</strong> need to write executable code.
    </p>
  `;

  const answer = async () => `
1. The first cell contains a comment with the email
   23f2003906@ds.study.iitm.ac.in and loads or defines a small dataset.

2. The second cell defines an interactive widget such as a slider that controls
   a parameter (e.g., a threshold or scaling factor).

3. A third cell computes derived values using both the dataset and the widget
   value. This cell automatically re-runs when the widget changes.

4. A fourth cell displays dynamic Markdown using mo.md(), summarizing the current
   results based on the computed values.

5. Because Marimo tracks dependencies, changing the widget causes all dependent
   cells to re-execute automatically, ensuring consistent and reproducible output.
  `;

  return { id, title, question, answer, weight };
}
