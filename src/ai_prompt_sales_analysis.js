export default {
  id: "ai-prompt-sales-analysis",
  title: "AI-Assisted Sales Performance Analysis Prompt",
  marks: 1,
  difficulty: "medium",

  description: `
You are a data analyst asked to use AI-assisted analysis
to extract insights from quarterly sales data.
Instead of performing calculations directly, you must
design a high-quality prompt that guides an AI to produce
meaningful, business-oriented analysis.
  `,

  dataset: {
    description: "Quarterly regional sales data",
    rows: 16,
    deterministic: true
  },

  requirements: [
    "Write a single, coherent prompt",
    "Prompt should guide the AI to analyze trends and patterns",
    "Prompt should ask for business-relevant insights",
    "No numerical computation required in the answer"
  ],

  submission: {
    type: "text",
    format: "AI prompt text",
    example:
      "Analyze the following quarterly sales dataset by identifying trends across regions..."
  },

  evaluation: {
    criteria: [
      "Clarity of instructions",
      "Analytical depth",
      "Focus on insights rather than raw numbers"
    ]
  },

  allowedTools: [
    "ChatGPT",
    "Claude",
    "Any LLM-based assistant"
  ]
};
