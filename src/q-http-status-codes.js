export default function ({ user, weight = 1 }) {
  return {
    id: "http_status_codes",
    weight,
    title: "HTTP Status Codes",
    question: `
Which HTTP status code should be returned when a client sends
invalid input data to an API?
    `,
    type: "mcq",
    options: [
      "200",
      "201",
      "400",
      "500"
    ],
    answer: "400"
  };
}
