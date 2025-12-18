export default function ({ user, weight }) {
  const sampleData = {
    api_key: "sk-proj-abc123xyz789",
    endpoint: "https://api.example.com/v1/chat",
    rate_limit: 100,
    metadata: {
      created_at: "2024-12-01T10:30:00Z",
      version: "1.2.3"
    }
  };

  return {
    id: "json-api-extract",
    weight,
    question: `
      <h2>JSON API Key Extraction</h2>
      <p><strong>Difficulty:</strong> 1 (next URL revealed even if wrong)</p>
      <p><strong>Personalized:</strong> No.</p>
      <ol>
        <li>Given the following JSON structure, extract the <code>api_key</code> field</li>
        <li>Return ONLY the api_key value as a plain string</li>
        <li>Do NOT return the entire JSON structure</li>
        <li>Do NOT wrap in quotes or escape characters</li>
      </ol>
      <p><strong>JSON Data:</strong></p>
      <pre>${JSON.stringify(sampleData, null, 2)}</pre>
      <p><strong>Hint:</strong> This tests the common mistake of returning the entire submission payload instead of just the answer value.</p>
    `,
    validate: (answer) => {
      const expected = "sk-proj-abc123xyz789";
      const trimmed = typeof answer === 'string' ? answer.trim() : String(answer);
      
      // Check if they submitted the whole JSON
      if (trimmed.includes('{') || trimmed.includes('email') || trimmed.includes('secret')) {
        return {
          correct: false,
          feedback: "You submitted the entire payload structure. Return ONLY the api_key value: sk-proj-abc123xyz789",
        };
      }
      
      if (trimmed === expected) {
        return { correct: true };
      }
      
      return {
        correct: false,
        feedback: `Expected: ${expected}. Got: ${answer}`,
      };
    },
  };
}
