export default {
  id: "multimodal_embeddings_body",
  title: "Multimodal Embeddings Request Structure",

  question: `
You are generating <b>multimodal embeddings</b> using a model that supports both text and images.

Requirements:
<ul>
  <li>Model: <code>jina-clip-v2</code></li>
  <li>Input must include:
    <ul>
      <li>One text input: <i>"A scenic mountain landscape"</i></li>
      <li>One image input (base64-encoded)</li>
    </ul>
  </li>
</ul>

Write the <b>JSON body</b> for a POST request to the embeddings API.

Do not include headers or the URL.
`,

  answer: ({ input }) => {
    try {
      const obj = JSON.parse(input)
      const inputs = obj.input || []

      const hasText = inputs.some(i => i.text)
      const hasImage = inputs.some(i => i.image)

      return (
        obj.model === "jina-clip-v2" &&
        Array.isArray(inputs) &&
        hasText &&
        hasImage
      )
    } catch {
      return false
    }
  }
}
