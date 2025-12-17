export default function ({ user, weight = 1 }) {
  return {
    id: "api_response_validation",
    type: "mcq",
    weight,
    question: `
You receive the following API response:

{
  "status": "success",
  "data": [
    { "id": 1, "value": 42 }
  ]
}

Which validation is MOST important before using this data in a data pipeline?
    `,
    options: [
      "Ensure status exists and data is an array",
      "Ensure value is always greater than zero",
      "Ensure the API response time is low",
      "Ensure the response is encrypted"
    ],
    answer: 0
  };
}
