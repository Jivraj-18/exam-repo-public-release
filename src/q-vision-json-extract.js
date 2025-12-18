export default function ({ user, weight = 1 }) {
  return {
    id: "vision-json-extract",
    title: "Vision Model JSON Extraction",
    weight,
    prompt: `
You are using gpt-4o-mini to extract structured data from an image.

Write the JSON body that:
- Sends ONE user message
- Includes text: "Extract invoice number and email"
- Includes an image_url field
- Uses low detail
    `,
    answer: `
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Extract invoice number and email" },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,<BASE64_IMAGE>",
            "detail": "low"
          }
        }
      ]
    }
  ]
}
    `.trim(),
  };
}
