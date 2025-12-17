export default function({ user, weight }) {
  return {
    id: "q-24F1001023-2",
    type: "mcq",
    text: "When using the Python `requests` library, which HTTP status code indicates that the client is forbidden from accessing the requested resource (often due to missing API keys)?",
    options: [
      "200 OK",
      "404 Not Found",
      "403 Forbidden",
      "500 Internal Server Error"
    ],
    answer: "403 Forbidden",
    weight: weight
  }
}