export default async function ({ user, weight = 1 }) {
  return {
    id: "vision-table-text-extraction",
    title: "Extract Text from Table Image using LLM Vision",
    description: `
You are given an image that contains a **table with rows and columns**.

Write **only the JSON body** for a POST request to the OpenAI Chat Completions API that:

- Uses model **gpt-4o-mini**
- Sends a **single user message**
- The user message must contain:
  1. Text: **"Extract all text from this table and return it as a Markdown table."**
  2. An image_url pointing to the table image (use the URL provided below)
- The image URL is:
  https://upload.wikimedia.org/wikipedia/commons/3/3a/CSV_table_example.png
- Uses image detail level **low**

❗ Do NOT include headers or curl.
❗ Paste ONLY the JSON body.
    `,
    type: "code",
    weight,
    solution: null,
  };
}
