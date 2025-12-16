import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const questionId = "llm-expense-extraction";
  
  const sampleExpenses = [
    "Bought office supplies from Staples for $45.50 on 2024-03-15",
    "Dinner meeting with client at Olive Garden, spent ₹2500 on March 20th",
    "Uber ride to airport on 3/22/2024, cost was $35",
    "Monthly software subscription - GitHub Pro $12 on March 1st"
  ];
  
  return {
    id: questionId,
    weight,
    question: html`
      <h3>Extract Structured Expense Data Using LLM</h3>
      <p>
        Use an LLM API (OpenAI/Claude) to extract structured expense information from text descriptions.
      </p>
      
      <h4>Sample Expense Descriptions:</h4>
      <pre><code>${sampleExpenses.map((e, i) => `${i+1}. ${e}`).join('\n')}</code></pre>

      <h4>Requirements:</h4>
      <ol>
        <li>Use OpenAI API or Claude API with structured output/JSON mode</li>
        <li>Extract: <code>vendor</code>, <code>amount</code> (convert to USD if needed), <code>date</code> (YYYY-MM-DD format), <code>category</code></li>
        <li>Categories should be one of: "Travel", "Food", "Office Supplies", "Software", "Other"</li>
        <li>Return a JSON array of expense objects</li>
        <li>Handle currency conversions (assume 1 INR = 0.012 USD)</li>
      </ol>

      <h4>Expected Output Format:</h4>
      <pre><code>[
  {
    "vendor": "Staples",
    "amount": 45.50,
    "date": "2024-03-15",
    "category": "Office Supplies"
  },
  {
    "vendor": "Olive Garden",
    "amount": 30.00,
    "date": "2024-03-20",
    "category": "Food"
  },
  ...
]</code></pre>

      <h4>Your Solution:</h4>
      <p>Write your Python code using LLM API:</p>
      <textarea 
        id="${questionId}-answer" 
        rows="25" 
        style="width: 100%; font-family: monospace;"
        placeholder="import openai
import json

expenses = [
    'Bought office supplies from Staples for $45.50 on 2024-03-15',
    # ... more expenses
]

# Your code here using OpenAI API with structured outputs
"></textarea>
    `,
    answer: async () => {
      const code = document.getElementById(`${questionId}-answer`).value;
      return { code };
    },
    help: [
      html`
        <h4>LLM Structured Output Tips</h4>
        <ul>
          <li>Use <code>response_format={"type": "json_object"}</code> in OpenAI API</li>
          <li>Or use <code>functions</code> parameter with JSON schema</li>
          <li>Clearly specify the desired JSON structure in your prompt</li>
          <li>Use Pydantic models to define the schema for validation</li>
          <li>Example prompt: "Extract expense info as JSON with fields: vendor, amount, date, category"</li>
        </ul>
      `,
    ],
  };
}