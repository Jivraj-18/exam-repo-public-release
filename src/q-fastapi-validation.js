export default function ({ user, weight = 1 } = {}) {
  return {
    id: "q-fastapi-input-validation",
    title: "Server-Side Input Validation using FastAPI",
    weight,
    prompt: /* html */ `
      <p>
        You are designing a FastAPI endpoint that receives the following JSON:
      </p>

      <pre>
{
  "user_id": "string",
  "features": [0.1, 0.5, 0.9],
  "timestamp": "ISO-8601 string"
}
      </pre>

      <p>
        <b>Tasks:</b>
        <ol>
          <li>Define validation rules for each field.</li>
          <li>Create a Pydantic model to enforce these rules.</li>
          <li>Explain how invalid inputs should be handled and logged.</li>
          <li>Provide one example of an invalid request and the expected error response.</li>
        </ol>
      </p>
    `
  };
}
