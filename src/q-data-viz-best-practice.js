export default function ({ user, weight }) {
  const emailLength = user.email.length;
  const questionIndex = emailLength % 3;
  
  const questions = [
    {
      scenario: "You have a time-series dataset with three product categories showing sales over 12 months. You want to show how each category contributes to the total over time.",
      options: {
        A: "Line chart with three separate lines",
        B: "Stacked area chart",
        C: "Grouped bar chart",
        D: "Scatter plot"
      },
      correct: "B",
      explanation: "Stacked area charts are ideal for showing cumulative contributions of categories over time while maintaining visibility of trends."
    },
    {
      scenario: "You need to compare the distribution of exam scores across 5 different courses to identify outliers and quartile ranges.",
      options: {
        A: "Box plot (box-and-whisker plot)",
        B: "Histogram",
        C: "Pie chart",
        D: "Line chart"
      },
      correct: "A",
      explanation: "Box plots excel at showing distribution, quartiles, median, and outliers for multiple groups side-by-side."
    },
    {
      scenario: "You want to show the relationship between two continuous variables (student study hours and exam scores) for 100 students to identify correlation.",
      options: {
        A: "Bar chart",
        B: "Pie chart",
        C: "Scatter plot",
        D: "Stacked area chart"
      },
      correct: "C",
      explanation: "Scatter plots are designed to show relationships and correlations between two continuous variables."
    }
  ];
  
  const selectedQuestion = questions[questionIndex];

  return {
    id: "data-viz-best-practice",
    weight,
    question: `
      <h2>Data Visualization Best Practices</h2>
      <p><strong>Difficulty:</strong> 2 (next URL revealed even if wrong)</p>
      <p><strong>Personalized:</strong> Yes (based on email length).</p>
      
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${emailLength}</p>
      <p><strong>Question Index:</strong> ${emailLength} mod 3 = ${questionIndex}</p>
      
      <h3>Scenario:</h3>
      <p>${selectedQuestion.scenario}</p>
      
      <h3>Which visualization type is MOST appropriate?</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>A)</strong> ${selectedQuestion.options.A}</li>
        <li><strong>B)</strong> ${selectedQuestion.options.B}</li>
        <li><strong>C)</strong> ${selectedQuestion.options.C}</li>
        <li><strong>D)</strong> ${selectedQuestion.options.D}</li>
      </ul>
      
      <p><strong>Submit your answer as a single letter:</strong> A, B, C, or D</p>
      
      <p><em>This tests your understanding of data visualization principles covered in Tools in Data Science.</em></p>
    `,
    validate: (answer) => {
      const submitted = typeof answer === 'string' ? answer.trim().toUpperCase() : String(answer).trim().toUpperCase();
      const correct = selectedQuestion.correct;
      
      if (submitted === correct) {
        return { correct: true };
      }
      
      return {
        correct: false,
        feedback: `Expected: ${correct}. ${selectedQuestion.explanation} (Your question was based on email length ${emailLength} mod 3 = ${questionIndex})`,
      };
    },
  };
}
