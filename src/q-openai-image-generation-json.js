export default function ({ user, weight = 0.75 }) {
  return {
    id: "openai-image-generation-json",
    title: "Image Generation with OpenAI API: JSON Request Body",
    weight,

    description: `
VisualCraft is developing an automated design pipeline that generates custom
images using OpenAI’s Image Generation API.

You are tasked with preparing the **JSON request body** for the image generation
endpoint.

Requirements:
• Use the **gpt-image-1** model
• Generate **1 image**
• Set the image size to **256x256**
• Set the response format to **b64_json**
• Use the following prompt:

  "An underwater scene with colorful coral reefs and tropical fish"

Write ONLY the JSON request body that will be sent to the endpoint:
https://api.openai.com/v1/images/generations

Do NOT include:
• The URL
• HTTP headers
• Explanations or comments

Return only valid JSON.
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "Valid JSON body for OpenAI image generation request"
    },

    grading: {
      type: "regex",
      pattern:
        '^\\{[\\s\\S]*"model"\\s*:\\s*"gpt-image-1"[\\s\\S]*"prompt"\\s*:\\s*"An underwater scene with colorful coral reefs and tropical fish"[\\s\\S]*"n"\\s*:\\s*1[\\s\\S]*"size"\\s*:\\s*"256x256"[\\s\\S]*"response_format"\\s*:\\s*"b64_json"[\\s\\S]*\\}$',
      caseSensitive: false,
      trim: true
    }
  };
}
