export default function ({ user, weight }) {
  return {
    id: "llm-prompt-pattern",
    weight,
    question: `
      <h2>LLM Prompt Engineering Pattern</h2>
      <p><strong>Difficulty:</strong> 3 (next URL only on correct answer)</p>
      <p><strong>Personalized:</strong> No.</p>
      <p><strong>Scenario:</strong> You're building an automated quiz solver that generates Python code using LLMs.</p>
      <ol>
        <li>The LLM must output code between markers: <code>#PYTHON_START</code> and <code>#PYTHON_END</code></li>
        <li>The code must define a variable called: <code>final_answer</code></li>
        <li>What is the MOST important rule to prevent the LLM from returning invalid responses?</li>
      </ol>
      <p><strong>Options:</strong></p>
      <ul style="list-style-type: none;">
        <li><strong>A)</strong> Tell the LLM to write efficient code</li>
        <li><strong>B)</strong> Tell the LLM to never return None, null, or empty values</li>
        <li><strong>C)</strong> Tell the LLM to add detailed comments</li>
        <li><strong>D)</strong> Tell the LLM to handle all exceptions</li>
      </ul>
      <p>Submit your answer as a single letter: A, B, C, or D</p>
      <p><strong>Hint:</strong> Think about what causes the most submission failures in automated systems.</p>
    `,
    validate: (answer) => {
      const correct = 'B';
      const submitted = typeof answer === 'string' ? answer.trim().toUpperCase() : String(answer).trim().toUpperCase();
      
      if (submitted === correct) {
        return { correct: true };
      }
      
      const explanations = {
        A: "Efficiency is good but not the most critical for correctness",
        B: "Correct! Returning None/null/empty breaks the submission pipeline",
        C: "Comments help readability but don't prevent invalid responses",
        D: "Exception handling is important but not the primary issue"
      };
      
      return {
        correct: false,
        feedback: `Expected: B. ${explanations[submitted] || 'Invalid option'}. The key insight: most failures occur when the LLM returns None instead of attempting a fallback answer.`,
      };
    },
  };
}
