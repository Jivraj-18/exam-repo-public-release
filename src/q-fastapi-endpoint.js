export default function ({ user, weight = 1 }) {
  return {
    id: "fastapi-endpoint",
    weight,
    prompt: `
Deploy a FastAPI server with a GET endpoint:

/api

It should:
- Serve JSON data
- Accept query parameters
- Enable CORS for all origins

Submit the **API URL**.
    `,
    answerType: "url",
    validate: (url) => url.includes("/api"),
  };
}
