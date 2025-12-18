export default function ({ user, weight }) {
  const apiResponse = {
    status: "success",
    data: {
      user: {
        email: user.email,
        stats: {
          requests: 128,
          errors: 7,
        },
      },
    },
  };

  return {
    id: "json-api-extract",
    weight,
    question: `
      <h2>JSON API Extraction</h2>
      <p><strong>Difficulty:</strong> 2</p>
      <p><strong>Personalized:</strong> Yes (email)</p>

      <p>Given the following API response:</p>

      <pre>${JSON.stringify(apiResponse, null, 2)}</pre>

      <ol>
        <li>Extract the number of <code>errors</code></li>
        <li>Return only the numeric value</li>
      </ol>

      <p><strong>Submit only the number</strong></p>
    `,
    validate: (answer) => {
      const expected = apiResponse.data.user.stats.errors;
      if (parseInt(answer) === expected) {
        return { correct: true };
      }
      return {
        correct: false,
        feedback: `Expected ${expected}`,
      };
    },
  };
}
