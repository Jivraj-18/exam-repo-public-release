export default {
  id: "llm-vision",
  weight: 1,
  question: `
A company scans receipts and wants to extract text using an LLM
vision model.

Write the JSON body for a POST request that:
- Uses model gpt-4o-mini
- Sends a single user message
- Contains text: Extract all visible text from this receipt
- Contains an image_url with a base64 encoded image
- Text appears before the image
  `,
  answer: ""
};

