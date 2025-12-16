export default async function () {
  return {
    id: "24f2005753-llm-story",
    title: "Data Storytelling Using LLMs",
    difficulty: 2,
    tags: ["llm", "storytelling", "visualization"],

    description: `
You are given a dataset showing monthly sales.

Task:
1. Generate a short narrative summarizing trends
2. Highlight one anomaly
3. Suggest one business action using an LLM
    `,

    input: { type: "file", extensions: [".csv"] },

    questions: [
      {
        id: "story",
        text: "Provide a concise data-driven narrative and recommendation.",
        type: "text",
      },
    ],
  };
}
