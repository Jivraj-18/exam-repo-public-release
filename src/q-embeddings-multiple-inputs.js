export default {
  id: "embeddings_multiple_inputs",
  title: "Generate Embeddings for Multiple Texts",

  question: `
You want to generate embeddings for TWO input strings using OpenAI's API.

Model to use: <code>text-embedding-3-small</code>

Write the JSON body for a POST request to the embeddings endpoint.
`,

  answer: ({ input }) => {
    try {
      const obj = JSON.parse(input)
      return (
        obj.model === "text-embedding-3-small" &&
        Array.isArray(obj.input) &&
        obj.input.length === 2
      )
    } catch {
      return false
    }
  }
}
