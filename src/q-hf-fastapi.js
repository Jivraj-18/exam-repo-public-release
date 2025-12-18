export default function ({ user, weight = 1.5 }) {
  return {
    id: "huggingface_fastapi_wikipedia",
    weight,

    prompt: `
A FastAPI app deployed on Hugging Face Spaces returns:

\`\`\`json
{
  "topic": "Larry Page",
  "url": "https://en.wikipedia.org/wiki/Larry_Page"
}
\`\`\`

Which Python library is MOST appropriate to fetch Wikipedia page metadata
inside this application?
    `.trim(),

    answer: "wikipedia",
  };
}
