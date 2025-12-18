export default async function ({ user, weight = 1 }) {
  return {
    id: "hf-streamlit-dashboard",
    title: "Interactive Data Visualization with Hugging Face Spaces (Streamlit)",
    description: `
You are a data analyst who wants to share insights with non-technical stakeholders using an interactive dashboard.

Create and deploy a **Streamlit application** on **Hugging Face Spaces (free tier)** that allows users to explore a small dataset interactively.

### Requirements

1. **Dataset**
- At least **10 rows**
- One **categorical column**
- One **numeric column**
- Data may be generated inside the app

2. **Visualization**
- One interactive chart (bar chart or line chart)
- Chart must respond to user input

3. **Interactivity**
- Use at least one Streamlit widget:
  - selectbox / slider / multiselect / checkbox

4. **Verification**
- Display your email clearly in the app:
  **${user.email}**
- Include a short explanation of the visualization

5. **Deployment**
- Platform: Hugging Face Spaces
- SDK: Streamlit
- Visibility: Public
- Hardware: CPU (free tier)

### Submission

Paste the **public Hugging Face Space URL** below.

Example:
\`\`\`
https://huggingface.co/spaces/username/interactive-dashboard
\`\`\`
    `,
    type: "text",
    placeholder: "https://huggingface.co/spaces/username/app-name",
    answer: {
      type: "regex",
      value: "^https://huggingface.co/spaces/.+/.+",
    },
    weight,
  };
}
