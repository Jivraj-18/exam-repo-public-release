export default function ({ weight = 1 }) {
  return {
    id: "jsonpath-latitude",

    question: `
      You are given a JSON response from a public REST API
      containing an array of items. Each item has a nested
      object called <code>location</code> with
      <code>latitude</code> and <code>longitude</code> fields.

      <br><br>
      Assume the JSON structure is conceptually like this:

      <pre>
      {
        "items": [
          { "location": { "latitude": 12.97, "longitude": 77.59 } },
          { "location": { "latitude": 28.61, "longitude": 77.20 } }
        ]
      }
      </pre>

      <br><br>
      Using <strong>zero-based indexing</strong>, what is the
      <strong>JSONPath (or equivalent logical path)</strong>
      to extract the <strong>latitude</strong> value of the
      <strong>second item</strong>?

      <br><br>
      <strong>Answer format:</strong><br>
      A valid JSONPath expression.
    `,

    answer: "$.items[1].location.latitude",

    weight,
  };
}
