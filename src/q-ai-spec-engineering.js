export default function({ user, weight = 1 }) {
  return {
    id: "q-ai-spec-engineering",
    type: "text",
    title: "AI Coding: Spec-First Development",
    description: `
      <p>You are building a FastAPI service for age and gender prediction using PyTorch. You need to provide clear context to an AI agent[cite: 813].</p>
      <p><b>Your Task:</b> Draft a <code>spec.md</code> or <code>llms.txt</code> entry that defines the following safety guardrail[cite: 819, 871, 875]:</p>
      <blockquote>The API must reject any image with a resolution lower than 224x224 pixels with a 422 error.</blockquote>
      <p>Which section of a <b>Spec-first development</b> document (as defined in TDS) should contain this requirement[cite: 821, 822]?</p>
    `,
    weight
  };
}