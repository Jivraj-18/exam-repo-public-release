
export default async function({ user, weight = 1 }) {
    return {
        id: "fastapi_request_validation",

        title: "FastAPI Request Validation and Error Handling",

        question: `
      <p>A FastAPI endpoint <code>/register</code> accepts JSON input with:</p>
      <ul>
        <li><code>email</code> (string)</li>
        <li><code>age</code> (integer)</li>
      </ul>

      <p>Validation rules:</p>
      <ul>
        <li><code>email</code> must contain <code>@</code></li>
        <li><code>age</code> must be between 13 and 120 (inclusive)</li>
      </ul>

      <p>The API returns HTTP 422 for validation errors.</p>

      <p>Out of the following inputs, how many will be accepted?</p>

      <pre>
1) { "email": "a@b.com", "age": 12 }
2) { "email": "user.com", "age": 20 }
3) { "email": "x@y.com", "age": 30 }
4) { "email": "p@q.com", "age": 121 }
5) { "email": "m@n.com", "age": 13 }
      </pre
      >
    `,

        answer: 2,

        validate: (v) => {
            const n = Number(v);
            if (!Number.isInteger(n)) return "Answer must be an integer";
            if (n !== 2)
                return "Incorrect. Check FastAPI/Pydantic validation behavior.";
            return true;
        },

        weight,
    };
}
