/**
 * LLM: Controlled Intent Classification with Strict JSON Output
 * Difficulty: High
 * Marks: 2
 *
 * This question evaluates:
 * - Prompt engineering discipline
 * - Correct LLM API usage
 * - Strict structured (JSON-only) outputs
 * - Realistic production constraints
 */

export default function ({ user, weight = 2 }) {
  const id = "llm_intent_classification_json";

  return {
    id,
    title: "LLM: Strict Intent Classification with JSON Output",
    weight,

    description: `
SupportOps is building an AI-powered ticket routing system.  
Incoming messages must be classified into **exactly one intent** so downstream systems can process them safely.

The system is fragile — **any non-JSON output will cause failures**.

---

### Input text

\`\`\`
The customer says the payment went through, but the dashboard still shows pending status.
\`\`\`

### Valid intent labels

- BILLING
- TECHNICAL
- ACCOUNT
- GENERAL

---

### Your task

Write a **Python program using httpx** that sends a request to the OpenAI-compatible Chat Completion API (via AI Pipe) to classify the intent.

#### Requirements

1. Use **gpt-4o-mini** as the model  
2. Include an **Authorization header** with a dummy API key  
3. The **first message must be a system message** that:
   - Forces **JSON-only output**
   - Restricts intent strictly to the labels above  
4. The **second message must be exactly the input text**
5. The model must return **only**:

\`\`\`json
{ "intent": "TECHNICAL" }
\`\`\`

6. Do **not** print anything else  
7. Do **not** post-process the output  

---

### Allowed libraries

\`\`\`python
import httpx
\`\`\`

---

### Submission

Paste **only the Python code**.
    `,

    type: "code",
    language: "python",

    /**
     * Reference answer (not shown to students)
     * Used for automated validation heuristics
     */
    answer: `
import httpx

url = "https://aipipe.org/openai/v1/chat/completions"

headers = {
    "Authorization": "Bearer DUMMY_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {
            "role": "system",
            "content": "Classify the user message into exactly one intent: BILLING, TECHNICAL, ACCOUNT, or GENERAL. Respond with ONLY valid JSON of the form { \\"intent\\": \\"LABEL\\" }."
        },
        {
            "role": "user",
            "content": "The customer says the payment went through, but the dashboard still shows pending status."
        }
    ]
}

response = httpx.post(url, json=payload, headers=headers)
response.raise_for_status()
print(response.json()["choices"][0]["message"]["content"])
    `.trim(),

    /**
     * Automated checker
     * No human grading
     */
    check: ({ answer }) => {
      if (!answer) return false;

      // Must mention correct model
      if (!answer.includes("gpt-4o-mini")) return false;

      // Must use httpx.post
      if (!answer.includes("httpx.post")) return false;

      // Must include Authorization header
      if (!/Authorization.*Bearer/i.test(answer)) return false;

      // Must include system + user roles
      if (!answer.includes('"role": "system"')) return false;
      if (!answer.includes('"role": "user"')) return false;

      // Must enforce JSON-only intent schema
      if (!answer.includes('"intent"')) return false;

      // Must include allowed labels
      const labels = ["BILLING", "TECHNICAL", "ACCOUNT", "GENERAL"];
      if (!labels.some((l) => answer.includes(l))) return false;

      return true;
    }
  };
}

