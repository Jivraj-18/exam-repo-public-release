import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-correlation-analysis";
  const title = "Statistical Correlation and Outlier Detection";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randFloat = (min, max) => min + random() * (max - min);

  // Generate correlated data: study_hours vs exam_score with some noise
  const baseCorrelation = 0.7 + random() * 0.2; // correlation between 0.7-0.9
  const numStudents = 40;
  
  const students = Array.from({ length: numStudents }, (_, i) => {
    const study_hours = randFloat(1, 10);
    // Create correlation: score increases with study hours + noise
    const baseScore = 50 + study_hours * 4;
    const noise = randFloat(-10, 10);
    const exam_score = Math.max(30, Math.min(100, baseScore + noise));
    
    return {
      student_id: i + 1,
      study_hours: parseFloat(study_hours.toFixed(2)),
      exam_score: parseFloat(exam_score.toFixed(2)),
    };
  });

  // Add a few outliers
  students[randInt(0, 5)] = {
    student_id: students[0].student_id,
    study_hours: randFloat(8, 10),
    exam_score: randFloat(30, 45), // low score despite high study hours
  };

  students[randInt(6, 10)] = {
    student_id: students[6].student_id,
    study_hours: randFloat(1, 3),
    exam_score: randFloat(85, 95), // high score despite low study hours
  };

  // Calculate Pearson correlation coefficient
  const hours = students.map(s => s.study_hours);
  const scores = students.map(s => s.exam_score);
  
  const meanHours = hours.reduce((a, b) => a + b) / hours.length;
  const meanScore = scores.reduce((a, b) => a + b) / scores.length;
  
  const numerator = students.reduce((sum, s) => 
    sum + (s.study_hours - meanHours) * (s.exam_score - meanScore), 0);
  
  const denomHours = Math.sqrt(students.reduce((sum, s) => 
    sum + Math.pow(s.study_hours - meanHours, 2), 0));
  const denomScores = Math.sqrt(students.reduce((sum, s) => 
    sum + Math.pow(s.exam_score - meanScore, 2), 0));
  
  const correlation = numerator / (denomHours * denomScores);

  const answer = (input) => {
    const value = parseFloat(input);
    if (isNaN(value)) throw new Error("Answer must be a number");
    if (Math.abs(value - correlation) < 0.05) return true; // Allow 5% tolerance
    throw new Error(`Expected correlation around ${correlation.toFixed(3)}, got ${value.toFixed(3)}`);
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing the relationship between study hours and exam performance for a statistics course.
        Calculate the Pearson correlation coefficient to measure the strength of the linear relationship.
      </p>
      <h5>Student Data:</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(students, null, 2)}
      </code></pre>
      <h5>Task:</h5>
      <ol>
        <li>Load the data into a pandas DataFrame</li>
        <li>Calculate the Pearson correlation coefficient between <code>study_hours</code> and <code>exam_score</code></li>
        <li>Use pandas method: <code>df['study_hours'].corr(df['exam_score'])</code> or <code>df.corr()</code></li>
        <li>Round your answer to 3 decimal places</li>
      </ol>
      <p class="text-muted">
        The Pearson correlation coefficient ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation).
        Values close to 0 indicate no linear relationship.
      </p>
      <label for="${id}" class="form-label">Pearson correlation coefficient (3 decimal places):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.001" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
