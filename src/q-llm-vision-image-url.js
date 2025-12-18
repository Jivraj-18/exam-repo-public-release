export default {
  id: "vision_image_url",
  title: "LLM Vision with Image URL",

  question: `
You are using <code>gpt-4o-mini</code> to analyze an image.

The user message must contain:
1. A text instruction
2. An image URL

Write ONLY the JSON body for the request.
`,

  answer: ({ input }) => {
    try {
      const obj = JSON.parse(input)
      const content = obj.messages?.[0]?.content
      return (
        obj.model === "gpt-4o-mini" &&
        Array.isArray(content) &&
        content.some(c => c.type === "image_url")
      )
    } catch {
      return false
    }
  }
}
