export default async function ({ user, weight = 1 }) {
  const id = "exam-" + user;
  const title = "TDS Bonus Activity Questions";

  const question = html`
    <!-- Question 1 -->
    <h3>1) LLM Fairness & Bias Detection </h3>
    <p>
      Write an LLM prompt that instructs a model to:
      <ul>
        <li>Classify a given customer support message into: <strong>CALM / UPSET / NEUTRAL</strong></li>
        <li>Detect whether the classification could be influenced by wording related to gender, age, or region</li>
        <li>Return a JSON with fields: <code>{ "sentiment": "string", "bias_warning": true|false }</code></li>
      </ul>
      (You only need to craft the prompt text — not executable code.)
    </p>

    <!-- Question 2 -->
    <h3>2) Build a Reactive Data Notebook with Marimo (1 mark)</h3>
    <p>
    You need to create an interactive data analysis notebook using <strong>Marimo</strong> that demonstrates the relationship between two variables in a dataset. The notebook should:
    <ul>
      <li>Include <strong>your email</strong> as a comment in the first cell</li>
      <li>Contain at least two cells with clear dependency (one influences the other)</li>
      <li>Use an interactive widget (e.g., slider or selector)</li>
      <li>Display <strong>dynamic markdown</strong> that updates automatically based on the widget's state</li>
      <li>Be self-documenting with comments explaining data flow</li>
    </ul>
    Describe, in plain English, the structure of the Marimo notebook and how the cells would interact to show dynamic output.
    </p>

    <!-- Question 3 -->
    <h3>3) Interactive CLI Workflow </h3>
    <p>
      Describe a step-by-step command-line interface flow that:
      <ol>
        <li>Prompts the user for a paragraph</li>
        <li>Sends it to an LLM for summarization</li>
        <li>Asks whether the user wants a <strong>bullet list</strong> or <strong>one-sentence summary</strong></li>
        <li>Displays the summarization result accordingly</li>
      </ol>
    </p>

    <!-- Question 4 -->
    <h3>4) LLM Quality Report </h3>
    <p>
      You have a CSV of financial transactions. Write the natural-language instruction
      you would send to an LLM that asks it to produce a data quality report that:
      <ul>
        <li>Identifies rows with missing values</li>
        <li>Describes any outlier numeric values</li>
        <li>Ends with a plain-English summary</li>
      </ul>
    </p>

    <!-- Question 5 -->
    <h3>5) Model Selection & Justification </h3>
    <p>
      For each of the following systems:
      <ol>
        <li>A real-time chat assistant embedded in a web app</li>
        <li>A nightly batch job that summarizes thousands of customer feedback entries</li>
      </ol>
      <ul>
        <li>Specify which type of LLM you would choose</li>
        <li>Give a short 2–3 sentence justification (consider cost, latency, quality)</li>
      </ul>
    </p>
  `;

  const answer = async () => ({
    1: /* Prompt text answer */ `
Write a prompt for the model:

"Classify the following customer support message into CALM, UPSET, or NEUTRAL. Also determine whether the wording of the message may reflect bias linked to gender, age, or region. Return the result exactly in JSON with keys 'sentiment' and 'bias_warning' (true/false). Respond only with the JSON."

Example output:
{
  "sentiment": "UPSET",
  "bias_warning": false
}
    `,

    2: /* Marimo notebook structure answer */ `
1. First cell (comment):
# 23f2003906@ds.study.iitm.ac.in - Marimo notebook start
2. Second cell:
Define dataset variables and load data.
3. Third cell:
Add an interactive widget slider controlling a numeric parameter (e.g., X threshold).
4. Fourth cell:
Compute dependent values based on slider and update dynamic markdown that displays summary text or computed chart based on widget state.
5. Comments in each cell describe what data is produced and how downstream cells use them.
    `,

    3: /* CLI flow answer */ `
1. Print "Enter a paragraph of text:" and read user input.
2. Send the input string to an LLM for summarization.
3. Print "Choose summary style (bullet/one-sentence):" and read choice.
4. If "bullet", display bullet list summary; if "one-sentence", display concise single sentence summary.
    `,

    4: /* LLM instruction answer */ `
"Please analyze this CSV of financial transactions and produce a data quality report. Identify rows with missing values, describe numeric outliers in each column, and finally provide a plain-English summary of the overall data quality issues and suggestions."
    `,

    5: /* Model choice answer */ `
Real-time chat assistant: Use a small/medium low-latency model (e.g., gpt-4o-mini) for cost efficiency and responsive interaction.  
Nightly batch summarization: Use a high-quality model (e.g., gpt-4o) to maximize summary depth and accuracy with higher throughput acceptable overnight.
    `
  });

  return { id, title, weight, question, answer };
}
