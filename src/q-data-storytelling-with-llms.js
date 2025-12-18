export default async function ({ user, weight = 1.5 }) {
  return {
    id: "data-storytelling-with-llms",
    title: "Data Storytelling with Large Language Models",
    weight,

    help: [
      `
Large Language Models (LLMs) can assist across the entire data-to-story value chain,
including data engineering, analysis, visualization, and narrative creation.

You are given a cleaned dataset containing customer feedback messages from a
consumer app along with timestamps and basic metadata.

Your task is to use an LLM-assisted workflow to create a compelling data story.

Steps:
1. Ask an LLM to propose at least **3 distinct analytical angles** to explore the dataset
   (e.g., sentiment trends, recurring complaints, emerging topics).
2. Select **one** of the proposed angles and ask the LLM to:
   • Write code to analyze the data (e.g., embeddings, clustering, aggregation)
   • Suggest at least one appropriate visualization
3. Generate a short **data-driven narrative** (5–7 sentences) explaining:
   • The key insight
   • Why it matters
   • A surprising or human-interest angle

You may use any LLM (e.g., ChatGPT, Claude) and any analysis or visualization tool
(Python, Excel, notebooks, etc.).

Return ONLY the final narrative text.
Do not include code, bullet points, or explanations.
      `,
    ],

    question: `
Generate a concise, compelling 5–7 sentence narrative describing a key insight
from the customer feedback data.
    `,

    type: "text",

    expectedOutput: {
      type: "string",
      description: "A concise data-driven narrative generated with LLM assistance",
    },

    grading: {
      type: "rubric",
      criteria: [
        "Narrative is data-driven and coherent",
        "Insight is clearly explained and meaningful",
        "Includes a human-interest or surprising element",
        "Demonstrates appropriate use of LLMs in the workflow",
      ],
    },
  };
}
